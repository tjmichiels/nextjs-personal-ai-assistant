export {}

declare global {
    interface Window {
        webkitSpeechRecognition: any
        SpeechRecognition: any
    }

    interface SpeechRecognition extends EventTarget {
        lang: string
        interimResults: boolean
        maxAlternatives: number
        onresult: (event: SpeechRecognitionEvent) => void
        onerror: (event: SpeechRecognitionErrorEvent) => void
        start(): void
    }

    interface SpeechRecognitionAlternative {
        transcript: string
        confidence: number
    }

    interface SpeechRecognitionResult {
        isFinal: boolean
        length: number
        item(index: number): SpeechRecognitionAlternative
        [index: number]: SpeechRecognitionAlternative
    }

    interface SpeechRecognitionResultList {
        length: number
        item(index: number): SpeechRecognitionResult
        [index: number]: SpeechRecognitionResult
    }

    interface SpeechRecognitionEvent extends Event {
        readonly resultIndex: number
        readonly results: SpeechRecognitionResultList
    }

    interface SpeechRecognitionErrorEvent extends Event {
        error: string
        message: string
    }
}
