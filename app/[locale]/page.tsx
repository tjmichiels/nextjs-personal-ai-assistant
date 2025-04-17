'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LocalePage() {
    const t = useTranslations()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [showMessage, setShowMessage] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    // States voor de prompt-omgeving
    const [prompt, setPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<string | null>(null)

    useEffect(() => {
        // Check authentication status
        const checkAuth = async () => {
            setLoading(true)
            const { data: { session } } = await supabase.auth.getSession()
            setIsAuthenticated(!!session)
            setLoading(false)
        }

        checkAuth()

        // Handle URL params and redirects
        const hash = window.location.hash
        const hashParams = new URLSearchParams(hash.slice(1))
        const type = hashParams.get('type')

        if (type === 'recovery') {
            router.replace('/reset-password-confirm' + window.location.hash)
            return
        }

        if (type === 'signup') {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Mockup response
        setTimeout(() => {
            setResult(`Dit is een voorbeeld resultaat voor je prompt: "${prompt}"`)
            setIsLoading(false)
        }, 1000)
    }

    if (loading) {
        return (
            <main className="p-6 text-center">
                <div className="animate-pulse">Laden...</div>
            </main>
        )
    }

    return (
        <main className="p-6">
            {showMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4 rounded text-sm max-w-lg mx-auto">
                    ✅ {showMessage}
                </div>
            )}

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-4">{t('welcome')}</h1>
                <p>{t('description')}</p>
            </div>

            {isAuthenticated && (
                <div className="max-w-3xl mx-auto bg-[var(--background)] border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Stel een vraag aan je assistent</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <textarea
                                className="w-full p-3 bg-[var(--background)] text-[var(--foreground)] border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Typ hier je vraag of prompt..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !prompt.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                        >
                            {isLoading ? 'Bezig...' : 'Verzenden'}
                        </button>
                    </form>

                    {result && (
                        <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700">
                            <h3 className="font-medium mb-2">Antwoord:</h3>
                            <p>{result}</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}