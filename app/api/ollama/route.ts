// app/api/ollama/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { prompt, model = 'llama2:latest' } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model.split(':')[0],
        prompt: prompt,
        stream: false,
      }),
    })

    if (!ollamaResponse.ok) {
      const error = await ollamaResponse.text()
      return NextResponse.json({ error: `Ollama error: ${error}` }, { status: ollamaResponse.status })
    }

    const data = await ollamaResponse.json()
    const llmText = data.response

    const elevenResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/GUDYcgRAONiI1nXDcNQQ`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVEN_API_KEY!,
      },
      body: JSON.stringify({
        text: llmText,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    })

    if (!elevenResponse.ok) {
      const error = await elevenResponse.text()
      return NextResponse.json({ error: `ElevenLabs error: ${error}` }, { status: elevenResponse.status })
    }

    const audioBuffer = await elevenResponse.arrayBuffer()
    const audioBase64 = Buffer.from(audioBuffer).toString('base64')

    return NextResponse.json({
      response: llmText,
      audio: `data:audio/mpeg;base64,${audioBase64}`,
    })
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
