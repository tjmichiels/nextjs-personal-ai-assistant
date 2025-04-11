'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'

export default function LocalePage() {
    const t = useTranslations()
    const router = useRouter()

    useEffect(() => {
        const hash = window.location.hash
        const params = new URLSearchParams(hash.slice(1))
        const type = params.get('type')

        // if (type === 'signup') {
        //     router.replace('/login?confirmed=true')
        // }

        if (type === 'recovery') {
            router.replace('/reset-password-confirm' + window.location.hash)
        }
    }, [])


    return (
        <main className="p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">{t('welcome')}</h1>
            <p>{t('description')}</p>
        </main>
    )
}