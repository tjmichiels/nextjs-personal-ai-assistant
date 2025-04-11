'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'

export default function LocalePage() {
    const t = useTranslations()
    const router = useRouter()

    const searchParams = useSearchParams()
    const [showMessage, setShowMessage] = useState<string | null>(null)

    useEffect(() => {
        const hash = window.location.hash
        const hashParams = new URLSearchParams(hash.slice(1))
        const type = hashParams.get('type')

        if (type === 'recovery') {
            router.replace('/reset-password-confirm' + window.location.hash)
            return
        }

        const success = searchParams.get('success')
        if (success === 'confirmed') {
            setShowMessage(t('email_confirmed'))
        }
        if (success === 'reset') {
            setShowMessage(t('password_reset_success'))
        }
    }, [searchParams, router, t])

    // useEffect(() => {
    //     const hash = window.location.hash
    //
    //     const params = new URLSearchParams(hash.slice(1))
    //     const type = params.get('type')
    //
    //     // if (type === 'signup') {
    //     //     router.replace('/login?confirmed=true')
    //     // }
    //
    //     if (type === 'recovery') {
    //         router.replace('/reset-password-confirm' + window.location.hash)
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     const type = searchParams.get('success')
    //
    //     if (type === 'confirmed') {
    //         setShowMessage(t('email_confirmed'))
    //     }
    //
    //     if (type === 'reset') {
    //         setShowMessage(t('password_reset_success'))
    //     }
    // }, [searchParams, t])


    return (
        <main className="p-6 text-center">
            {showMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4 rounded text-sm max-w-lg mx-auto">
                    ✅ {showMessage}
                </div>
            )}

            <h1 className="text-3xl font-bold mb-4">{t('welcome')}</h1>
            <p>{t('description')}</p>
        </main>
    )
}