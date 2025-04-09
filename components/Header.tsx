'use client'

import Link from 'next/link'
import { usePathname } from '@/i18n/navigation'
import { useRouter } from '@/i18n/navigation'
import { useTheme } from 'next-themes'
import { useTransition } from 'react'
import { routing } from '@/i18n/routing'

export default function Header({ locale }: { locale: string }) {
    const pathname = usePathname()
    const router = useRouter()
    const { theme, setTheme } = useTheme()

    return (
        <header className="flex items-center justify-between px-4 py-2 border-b">
            <Link href={`/${locale}`} className="font-bold text-xl">Privatar</Link>

            <div className="flex gap-4 items-center">
                <select
                    value={locale}
                    onChange={(e) => {
                        // const newLocale = e.target.value
                        // const pathWithoutLocale = pathname.replace(/^\/(nl|en)/, '')
                        // router.push(`/${newLocale}${pathWithoutLocale}`)

                        const newLocale = e.target.value

                        // Detecteer huidige locale uit props
                        const currentLocale = locale

                        // Strip de huidige locale uit het pad
                        const pathWithoutLocale = pathname.replace(new RegExp(`^/${currentLocale}`), '')

                        // Bouw het nieuwe pad correct
                        const newPath = `/${newLocale}${pathWithoutLocale}`

                        router.push(newPath)
                    }}
                    className="border px-2 py-1 rounded"
                >
                    {routing.locales.map((loc) => (
                        <option key={loc} value={loc}>{loc.toUpperCase()}</option>
                    ))}
                </select>

                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="border px-2 py-1 rounded"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                <Link href={`/${locale}/login`} className="border px-2 py-1 rounded">
                    Login
                </Link>
            </div>
        </header>
    )
}