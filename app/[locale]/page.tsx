'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import FAQ from './components/FAQ'

export default function LocalePage() {
    const t = useTranslations()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [showMessage, setShowMessage] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const [prompt, setPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [selectedModel, setSelectedModel] = useState('llama2:latest')
    const [isListening, setIsListening] = useState(false)
    const [audioSrc, setAudioSrc] = useState<string | null>(null)
    const [showOnboarding, setShowOnboarding] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true)
            const { data: { session } } = await supabase.auth.getSession()
            setIsAuthenticated(!!session)
            setLoading(false)
        }

        checkAuth()

        const hash = window.location.hash
        const hashParams = new URLSearchParams(hash.slice(1))
        const type = hashParams.get('type')

        if (type === 'recovery') {
            router.replace('/reset-password-confirm' + window.location.hash)
            return
        }
        if (type === 'signup') {
            sessionStorage.setItem('forceShowOnboarding', 'true')
            router.replace('/?success=confirmed')
        }

        const success = searchParams.get('success')
        if (success === 'confirmed') {
            setShowMessage(t('email_confirmed'))
        }
        if (success === 'reset') {
            setShowMessage(t('password_reset_success'))
        }
    }, [searchParams, router, t])

    useEffect(() => {
        if (typeof window !== 'undefined' && isAuthenticated) {
            const forceShow = sessionStorage.getItem('forceShowOnboarding')
            const hasSeen = localStorage.getItem('hasSeenOnboarding')

            if (forceShow || !hasSeen) {
                setShowOnboarding(true)
                sessionStorage.removeItem('forceShowOnboarding')
            }
        }
    }, [isAuthenticated])

    const handleDismissOnboarding = () => {
        localStorage.setItem('hasSeenOnboarding', 'true')
        setShowOnboarding(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setResult(null)
        setError(null)
        setAudioSrc(null)

        try {
            const response = await fetch('/api/ollama', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    model: selectedModel,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response')
            }

            setResult(data.response)
            setAudioSrc(data.audio)
        } catch (error) {
            console.error('Error:', error)
            setError(t('error_message') || 'Error processing your request')
        } finally {
            setIsLoading(false)
        }
    }

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) {
            setError(t('speech_not_supported'))
            return
        }

        const recognition = new SpeechRecognition()
        recognition.lang = 'nl-NL'
        recognition.interimResults = false
        recognition.maxAlternatives = 1

        setIsListening(true)

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript
            setPrompt(transcript)
            setIsListening(false)
        }

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Spraakherkenning fout:', event.error)
            setError(`Spraakherkenning is mislukt: ${event.error}`)
            setIsListening(false)
        }

        recognition.onend = () => {
            setIsListening(false)
        }

        recognition.start()
    }

    if (loading) {
        return (
            <main className="p-6 text-center">
                <div className="animate-pulse">{t('loading')}</div>
            </main>
        )
    }

    return (
        <main className="p-6">
            {showOnboarding && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg max-w-md p-6 space-y-4 text-center text-zinc-800 dark:text-white">
                        <h2 className="text-2xl font-bold mb-4">{t('onboarding_title')}</h2>
                        <ul className="space-y-3 text-left">
                            <li>{t('onboarding_step1')}</li>
                            <li>{t('onboarding_step2')}</li>
                            <li>{t('onboarding_step3')}</li>
                        </ul>
                        <button
                            onClick={handleDismissOnboarding}
                            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            {t('onboarding_button')}
                        </button>
                    </div>
                </div>
            )}

            {showMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4 rounded text-sm max-w-lg mx-auto">
                    ✅ {showMessage}
                </div>
            )}

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold italic mb-4 flex items-center justify-center gap-1">
                    <img
                        src="/assets/windesheim.svg"
                        alt="W"
                        className="size-12 -mr-2 align-text-bottom inline-block"
                    />
                    {t('welcome')}
                </h1>
                <p>{t('description')}</p>
            </div>

            {isAuthenticated && (
                <div
                    className="max-w-3xl mx-auto bg-[var(--background)] border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">{t('ask_assistant')}</h2>
                        <div className="flex items-center">
                            <label htmlFor="model-select" className="mr-2 text-sm">
                                {t('model') || 'Model'}:
                            </label>
                            <select
                                id="model-select"
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="p-2 bg-[var(--background)] text-[var(--foreground)] border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="tinyllama:latest">TinyLlama</option>
                                <option value="llama2:latest">Llama 2</option>
                                <option value="llama3.2:latest">Llama 3.2</option>
                                <option value="llama3:latest">Llama 3</option>
                            </select>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <textarea
                                className="w-full p-3 bg-[var(--background)] text-[var(--foreground)] border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={t('prompt_placeholder')}
                                required
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                            <button
                                type="submit"
                                disabled={isLoading || !prompt.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition mb-2 sm:mb-0"
                            >
                                {isLoading ? t('loading_action') : t('send')}
                            </button>

                            <button
                                type="button"
                                onClick={startListening}
                                className={`px-4 py-2 rounded-md transition text-white ${isListening ? 'bg-green-800' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {isListening ? t('listening') || 'Luistert...' : t('speak_now') || 'Spreek in'}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
                            <h3 className="font-medium mb-2">{t('error')}</h3>
                            <p>{error}</p>
                        </div>
                    )}

                    {result && !error && (
                        <div className="mt-6 p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md !bg-opacity-100">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium text-black dark:text-white">{t('answer')}</h3>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900/30 dark:text-blue-300">
                                    {selectedModel}
                                </span>
                            </div>
                            <p className="whitespace-pre-wrap text-black dark:text-gray-200 mb-2">{result}</p>

                            {audioSrc && (
                                <button
                                    onClick={() => new Audio(audioSrc).play()}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    {t('play_audio')}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}

            {isAuthenticated && !showOnboarding && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setShowOnboarding(true)}
                        className="text-sm text-zinc-500 hover:text-blue-600 transition"
                    >
                        {t('show_onboarding')}
                    </button>
                </div>
            )}

            {/* FAQ knop rechtsonder */}
            <FAQ />
        </main>
    )
}
