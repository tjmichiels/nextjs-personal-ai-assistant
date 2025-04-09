import { NextRequest, NextResponse } from 'next/server'
import {DEFAULT_LOCALE} from "@/config";
import createMiddleware from 'next-intl/middleware'
// import i18nConfig from './i18n'
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};