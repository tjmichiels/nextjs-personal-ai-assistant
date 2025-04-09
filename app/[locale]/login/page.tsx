'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { useTranslations } from 'next-intl' // Localisatie

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const t = useTranslations() // Localisatie

    const login = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        alert(error ? error.message : 'Succesvol ingelogd!')
    }

    return (
        <div className="max-w-sm mx-auto mt-10 space-y-4">
            <h2 className="text-xl font-bold">{t('login')}</h2>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded p-2 w-full"
            />
            <input
                type="password"
                placeholder="Wachtwoord"
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded p-2 w-full"
            />
            <button onClick={login} className="bg-green-500 text-white p-2 rounded w-full">
                {t('login')}
            </button>
            <p className="text-sm">
                Nog geen account?{' '}
                <Link href="/signup" className="text-blue-500 underline">
                    Maak er een aan
                </Link>
            </p>
        </div>
    )
}