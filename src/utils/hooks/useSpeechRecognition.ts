import { useEffect, useState } from 'react'

export const useSpeechRecognition = ({
  lang = 'pt-BR',
  isActive = true
} = {}) => {
  const [transcript, setTranscript] = useState('')

  useEffect(() => {
    if (!isActive) return

    if (!('webkitSpeechRecognition' in window)) {
      console.log('O navegador não suporta o reconhecimento de fala.')
      return
    }

    const recognition = new (window.webkitSpeechRecognition as any)()
    recognition.lang = lang

    recognition.onresult = ({ results }) => {
      setTranscript(results[0][0].transcript)
    }

    recognition.onend = recognition.start

    recognition.onerror = (event) => {
      console.error('Erro na transcrição de áudio:', event.error)
    }

    recognition.start()

    return () => {
      recognition.onend = null
      recognition.stop()
    }
  }, [isActive, lang])

  return { transcript, isActive, lang }
}
