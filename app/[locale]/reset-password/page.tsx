'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { supabase } from '@/lib/supabaseClient'

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')
    const t = useTranslations()

    const handleReset = async () => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password-confirm`, // maak deze route ook later aan
        })

        if (error) {
            setError(error.message)
        } else {
            setSent(true)
        }
    }

    return (
        <div className="max-w-sm mx-auto mt-10 space-y-4">
            <h2 className="text-xl font-bold">{t('forgot_password')}</h2>
            {sent ? (
                <p className="text-green-600 text-sm">✅ {t('reset_sent')}</p>
            ) : (
                <>
                    <input
                        type="email"
                        placeholder={t('email')}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                    <button onClick={handleReset} className="bg-blue-500 text-white p-2 rounded w-full">
                        {t('send_reset_link')}
                    </button>
                </>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}