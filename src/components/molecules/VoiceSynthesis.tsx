import { Box, type BoxProps } from '@mui/material'
import type React from 'react'
import { useEffect, useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { VoiceIndicator } from '~components/atoms'
import { type ISelectOption } from '~components/molecules'
import { textToSpeech } from '~utils/functions'

interface IVoiceSynthesisProps extends BoxProps {
  text: string
  onStart?: () => void
  onEnd?: () => void
}

export const VoiceSynthesis: React.FC<IVoiceSynthesisProps> = ({
  text,
  onStart,
  onEnd,
  ...props
}) => {
  const [isTalking, setIsTalking] = useState(false)
  const [langSelected] = useStorage('form.langSelected', 'pt-BR')
  const [voiceSelected] = useStorage<string>('form.voiceSelected')
  const [speed] = useStorage('form.speed', 1)
  const [pitch] = useStorage('form.pitch', 1)
  const [volume] = useStorage('form.volume', 10)
  const [, setLangOptions] = useStorage<ISelectOption[]>('form.langOptions', [])
  const [, setVoiceOptions] = useStorage<ISelectOption[]>(
    'form.voiceOptions',
    []
  )

  const handleInitVoiceOptions = () => {
    const voices = window.speechSynthesis.getVoices()

    const langs = [...new Set(voices.map((voice) => voice.lang))]
    const newLangOptions = langs
      .map((lang) => ({ value: lang, label: lang }))
      .sort((a, b) => (a.label < b.label ? -1 : 1))
    setLangOptions(newLangOptions)

    const newVoicesOptions = voices
      .filter((voice) => voice.lang === langSelected)
      .map(({ name, lang }) => ({ value: name, label: name, lang }))
    setVoiceOptions(newVoicesOptions)
  }

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = handleInitVoiceOptions
  }, [])

  useEffect(handleInitVoiceOptions, [langSelected])

  useEffect(() => {
    textToSpeech(text, {
      voiceLang: langSelected,
      voiceName: voiceSelected,
      speed,
      pitch,
      volume,
      onStart: () => {
        onStart()
        setIsTalking(true)
      },
      onEnd: () => {
        onEnd()
        setIsTalking(false)
      }
    })
  }, [text, langSelected, voiceSelected])

  return (
    <Box {...props}>{isTalking && <VoiceIndicator variant="talking" />}</Box>
  )
}
