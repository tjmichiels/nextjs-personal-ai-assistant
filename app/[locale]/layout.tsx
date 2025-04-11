// import { ReactNode } from 'react'
// import { notFound } from 'next/navigation'
// import { NextIntlClientProvider } from 'next-intl'
// import Header from '@/components/Header'
//
// interface LocaleLayoutProps {
//     children: ReactNode
//     params: { locale: string }
//     // ✨ voeg een index signature toe om foute "parallel segment props" te negeren
//     [key: string]: unknown
// }
//
// export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
//     let messages
//     try {
//         messages = (await import(`@/messages/${params.locale}.json`)).default
//     } catch (error) {
//         notFound()
//     }
//
//     return (
//         <NextIntlClientProvider locale={params.locale} messages={messages}>
//             <Header locale={params.locale} />
//             {children}
//         </NextIntlClientProvider>
//     )
// }
import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import Header from '@/components/Header'

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: ReactNode
    params: { locale: string }
}) {
    let messages
    try {
        messages = (await import(`@/messages/${params.locale}.json`)).default
    } catch (error) {
        notFound()
    }

    return (
        <NextIntlClientProvider locale={params.locale} messages={messages}>
            <Header locale={params.locale} />
            {children}
        </NextIntlClientProvider>
    )
}

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'nl' }]
}