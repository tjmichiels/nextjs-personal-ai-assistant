'use client'

import { useTranslations } from 'next-intl'

export default function LocalePage() {
    const t = useTranslations()

    return (
        <main className="p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">{t('welcome')}</h1>
            <p>{t('description')}</p>
        </main>
    )
}