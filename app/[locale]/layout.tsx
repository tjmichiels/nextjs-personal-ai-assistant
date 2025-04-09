// import { ReactNode } from 'react'
// import { notFound } from 'next/navigation'
// import { NextIntlClientProvider } from 'next-intl'
// import Header from '@/components/Header'
//
// interface LocaleLayoutProps {
//     children: ReactNode
//     params: { locale: string }
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
import { NextIntlClientProvider } from 'next-intl'
import Header from '@/components/Header'

type Props = {
    children: ReactNode
    params: { locale: string }
}

export default function LocaleLayout({ children, params }: Props) {
    return (
        <NextIntlClientProvider locale={params.locale}>
            <Header locale={params.locale} />
            {children}
        </NextIntlClientProvider>
    )
}