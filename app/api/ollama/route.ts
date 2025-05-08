// app/api/ollama/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, model = 'llama2:latest' } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model.split(':')[0], // Remove the ":latest" part if present
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: `Ollama error: ${error}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error('Error calling Ollama:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}