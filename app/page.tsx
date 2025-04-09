import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import {DEFAULT_LOCALE} from "@/config";

export default async function RootPage() {
    const reqHeaders = await headers()
    const lang = reqHeaders.get('accept-language')?.toLowerCase() || ''

    let locale: string = DEFAULT_LOCALE // Default locale fallback
    if (lang.includes('en')) {
        locale = 'en'
    } else if (lang.includes('nl')) {
        locale = 'nl'
    }

    redirect(`/${locale}`)
}

// import Link from 'next/link';
//
// export default function Home() {
//   return (
//       <div className="w-full justify-items-center min-h-screen h-full align-middle">
//           <h1 className="font-bold text-2xl">Persoonlijke AI-assistent</h1>
//           <p>I ❤️ Windesheim!</p>
//           <div className="mt-4 space-x-4">
//               <Link href="/signup" className="text-blue-500 underline">
//                   Account aanmaken
//               </Link>
//               <Link href="/login" className="text-green-500 underline">
//                   Inloggen
//               </Link>
//           </div
//       </div>
//   );
// }
