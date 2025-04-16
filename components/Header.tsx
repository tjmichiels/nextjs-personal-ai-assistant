'use client'

import Link from 'next/link'
import {usePathname, useRouter} from '@/i18n/navigation'
import {useTheme} from 'next-themes'
import {routing} from '@/i18n/routing'
import {useEffect, useState} from 'react'
import {supabase} from '@/lib/supabaseClient'
import {User} from '@supabase/supabase-js'
import {useTranslations} from 'next-intl'

export default function Header({locale}: { locale: string }) {
    const pathname = usePathname()
    const router = useRouter()
    const {theme, setTheme} = useTheme()
    const [user, setUser] = useState<User | null>(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const t = useTranslations()

    useEffect(() => {
        supabase.auth.getUser().then(({data}) => {
            setUser(data.user)
        })

        const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => listener.subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh() // herlaad pagina om auth status te resetten
    }

    return (
        <header className="flex items-center justify-between px-4 py-2 border-b">
            <Link href={`/${locale}`} className="font-bold text-xl">{t('project_name')}</Link>

            <div className="flex gap-4 items-center">
                {/* 🌍 Locale switcher */}
                <select
                    value={locale}
                    onChange={(e) => {
                        const newLocale = e.target.value
                        if (routing.locales.includes(newLocale as any)) {
                            const typedLocale = newLocale as (typeof routing)['locales'][number]
                            const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '')
                            const newPath = `/${typedLocale}${pathWithoutLocale}`
                            router.push(newPath)
                        }
                        const currentLocale = locale
                        const pathWithoutLocale = pathname.replace(new RegExp(`^/${currentLocale}`), '')
                        const newPath = `/${newLocale}${pathWithoutLocale}`
                        router.push(newPath)
                    }}
                    className="border px-2 py-1 rounded"
                >
                    {routing.locales.map((loc) => (
                        <option key={loc} value={loc}>{loc.toUpperCase()}</option>
                    ))}
                </select>

                {/* 🌗 Dark mode toggle */}
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="border px-2 py-1 rounded"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                {/* 👤 Auth status */}
                {!user ? (
                    <Link href={`/${locale}/login`} className="border px-2 py-1 rounded">
                        {t('login')}
                    </Link>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-8 h-8 rounded-full border flex items-center justify-center"
                            aria-label="Profiel"
                        >
                            👤
                        </button>
                        {dropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-64 border rounded shadow p-4 text-sm z-10 bg-[var(--background)] text-[var(--foreground)]">
                                <p className="text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                <hr className="my-2 border-zinc-300 dark:border-zinc-600"/>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left text-red-600 hover:underline"
                                >
                                    {t('logout')}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}