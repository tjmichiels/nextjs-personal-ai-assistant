'use client'

import {useEffect, useState} from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { useTranslations } from 'next-intl' // Localisatie
import { useRouter } from '@/i18n/navigation'

export default function SignUpPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const t = useTranslations() // Localisatie
    const router = useRouter()

    // redirect als gebruiker ingelogd is
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) router.push('/')
        })
    }, [])


    const signUp = async () => {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) return alert(error.message)
        setMessage(t('signup_success'))
        router.push('/login?signup=success')
    }

    return (
        <div className="max-w-sm mx-auto mt-10 space-y-4">
            <h2 className="text-xl font-bold">{t('signup')}</h2>
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
            <button onClick={signUp} className="bg-blue-500 text-white p-2 rounded w-full">
                {t('signup')}
            </button>
            <p className="text-sm">
                {t('have_account')}{' '}
                <Link href="/login" className="text-blue-500 underline">
                    {t('login_here')}
                </Link>
            </p>
        </div>
    )
}