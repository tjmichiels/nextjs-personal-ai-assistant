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

type Params = Promise<{ locale: string }>

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: ReactNode
    params: Params
}) {
    const { locale } = await params

    let messages
    try {
        messages = (await import(`@/messages/${locale}.json`)).default
    } catch {
        notFound()
    }

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <Header locale={locale} />
            {children}
        </NextIntlClientProvider>
    )
}