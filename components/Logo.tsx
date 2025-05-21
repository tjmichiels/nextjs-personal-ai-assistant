'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Logo() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setIsDarkMode(mediaQuery.matches)
        const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    const logoSrc = isDarkMode
        ? '/logos/windesheim_dark.png'
        : '/logos/windesheim_light.png'

    return (
        <Image
            src={logoSrc}
            alt="Windesheim logo"
            width={140}
            height={40}
            priority
        />
    )
}