import {NextIntlClientProvider} from 'next-intl'
import {notFound} from 'next/navigation'
import Header from '@/components/Header'
import {ReactNode} from 'react'

type Props = {
    children: ReactNode
    params: { locale: string }
}

export default async function LocaleLayout({children, params}: Props) {
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