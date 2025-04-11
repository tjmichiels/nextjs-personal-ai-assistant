'use client'

import { useEffect, useState } from 'react'
import { useRouter } from '@/i18n/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ResetPasswordConfirmPage() {
    const [password, setPassword] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        const { hash } = window.location
        const params = new URLSearchParams(hash.substring(1))
        const access_token = params.get('access_token')
        const type = params.get('type')

        if (type === 'recovery' && access_token) {
            supabase.auth.setSession({ access_token, refresh_token: '' })
                .then(() => setConfirmed(true))
                .catch(err => setError(err.message))
        } else {
            setError('Invalid recovery link.')
        }
    }, [])

    const updatePassword = async () => {
        const { error } = await supabase.auth.updateUser({ password })
        if (error) return setError(error.message)

        router.push('/?success=reset')
    }

    return (
        <div className="max-w-sm mx-auto mt-10 space-y-4">
            <h2 className="text-xl font-bold">Reset password</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {confirmed && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        updatePassword()
                    }}
                    className="space-y-4"
                >
                    <input
                        type="password"
                        placeholder="New password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                    <button onClick={updatePassword} className="bg-blue-500 text-white p-2 rounded w-full">
                        Update password
                    </button>
                </form>
            )}
        </div>
    )
}