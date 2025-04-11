import {ReactNode} from 'react'
import {notFound} from 'next/navigation'
import {NextIntlClientProvider} from 'next-intl'
import Header from '@/components/Header'

// interface LocaleLayoutProps {
//     children: ReactNode
//     params: { locale: string }
//     // ✨ voeg een index signature toe om foute "parallel segment props" te negeren
//     [key: string]: unknown
// }
//
// export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode
    params: { [key: string]: string }
}) {
    let messages
    try {
        messages = (await import(`@/messages/${params.locale}.json`)).default
    } catch (error) {
        notFound()
    }

    return (
        <NextIntlClientProvider locale={params.locale} messages={messages}>
            <Header locale={params.locale}/>
            {children}
        </NextIntlClientProvider>
    )
}