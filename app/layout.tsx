// app/layout.tsx
import './globals.css'
import { Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Providers } from '@/app/providers'

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    variable: '--font-roboto',
    display: 'swap',
})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="nl" className={roboto.variable}>
        <body className="font-sans antialiased">
        <Providers>
            <Analytics />
            {children}
        </Providers>
        </body>
        </html>
    )
}