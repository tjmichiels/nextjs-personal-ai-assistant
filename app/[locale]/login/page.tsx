'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { useTranslations } from 'next-intl' // Localisatie
import { useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const t = useTranslations() // Localisatie
    const router = useRouter()

    const searchParams = useSearchParams()
    const signupSuccess = searchParams.get('signup') === 'success'
    const resetSuccess = searchParams.get('reset') === 'success'

    // redirect als gebruiker ingelogd is
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) router.push('/')
        })
    }, [])


    const login = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) return alert(error.message)
        router.push('/')
    }


    return (
        <div className="max-w-sm mx-auto mt-10 space-y-4">

            {signupSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
                    ✅ {t('signup_success')}
                </div>
            )}

            {resetSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
                    ✅ {t('password_reset_success')}
                </div>
            )}

            <h2 className="text-xl font-bold">{t('login')}</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    login()
                }}
                className="space-y-4"
            >
                <input
                    type="email"
                    placeholder={t('email')}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded p-2 w-full"
                />
                <input
                    type="password"
                    placeholder={t('password')}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded p-2 w-full"
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
                    {t('login')}
                </button>
            </form>
            <p className="text-sm">
                {t('no_account')}{' '}
                <Link href="/signup" className="text-blue-500 underline">
                    {t('create_one')}
                </Link>
            </p>
            <p className="text-sm">
                <Link href="/reset-password" className="text-blue-500 underline">
                    {t('forgot_password')}
                </Link>
            </p>
        </div>
    )
}