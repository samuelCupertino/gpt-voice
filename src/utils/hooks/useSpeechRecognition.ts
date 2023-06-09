import { useEffect, useState } from 'react'

export const useSpeechRecognition = ({
  lang = 'pt-BR',
  isEnabled = true
} = {}) => {
  const [reloadRecognition, setReloadRecognition] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isFinal, setIsFinal] = useState('')

  useEffect(() => {
    if (!isEnabled) return

    if (!('webkitSpeechRecognition' in window)) {
      console.log('O navegador não suporta o reconhecimento de fala.')
      return
    }

    const recognition = new (window.webkitSpeechRecognition as any)()
    recognition.lang = lang
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = ({ results }) => {
      const transcripts = [...results].map((result) => result[0].transcript)
      const newTranscript = transcripts.reduce((acc, cur) => acc + cur, '')
      const { isFinal } = results[0]

      if (isFinal) setReloadRecognition(true)

      setIsFinal(isFinal)
      setTranscript(newTranscript)
    }

    recognition.onend = () => {
      recognition.start()
    }

    recognition.onerror = (event) => {
      console.error('Erro na transcrição de áudio:', event.error)
    }

    recognition.start()
    setReloadRecognition(false)

    return () => {
      setTranscript('')
      recognition.onend = null
      recognition.stop()
    }
  }, [isEnabled, lang, reloadRecognition, setReloadRecognition])

  return { transcript, isFinal, isEnabled, lang }
}
