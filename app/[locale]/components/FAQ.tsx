'use client'

import { useState } from 'react'
import { HelpCircle } from 'lucide-react'

export default function FAQ() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <div className="w-80 p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-xl animate-fade-in">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">❓ FAQ</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Sluiten
                        </button>
                    </div>

                    <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
                        <div>
                            <p className="font-semibold">Wat doet deze AI?</p>
                            <p>Hij helpt met studievragen & mentale support.</p>
                        </div>
                        <div>
                            <p className="font-semibold">Kan ik Nederlands praten?</p>
                            <p>Zeker weten, spreek of typ gewoon in het NL.</p>
                        </div>
                        <div>
                            <p className="font-semibold">Waar komt de stem vandaan?</p>
                            <p>De stem komt van de ElevenLabs voice API.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
                    aria-label="Toon FAQ"
                >
                    <HelpCircle className="w-5 h-5" />
                </button>
            )}
        </div>
    )
}
