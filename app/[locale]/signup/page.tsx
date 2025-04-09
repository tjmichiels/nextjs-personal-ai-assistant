'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { useTranslations } from 'next-intl' // Localisatie

export default function SignUpPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const t = useTranslations() // Localisatie

    const signUp = async () => {
        const { error } = await supabase.auth.signUp({ email, password })
        alert(error ? error.message : 'Check je e-mail om te bevestigen!')
    }

    return (
        <div className="max-w-sm mx-auto mt-10 space-y-4">
            <h2 className="text-xl font-bold">{t('signup')}</h2>
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
            <button onClick={signUp} className="bg-blue-500 text-white p-2 rounded w-full">
                Aanmelden
            </button>
            <p className="text-sm">
                Heb je al een account?{' '}
                <Link href="/login" className="text-blue-500 underline">
                    Log hier in
                </Link>
            </p>
        </div>
    )
}