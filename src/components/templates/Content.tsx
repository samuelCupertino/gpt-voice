import { Box } from '@mui/material'
import type React from 'react'
import { useEffect } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import type { ISelectOption } from '~components/molecules'
import { VoiceChatGPT } from '~components/organisms'

export const Content: React.FC = () => {
  const [isActive] = useStorage('form.isActive', false)
  const [, setLangOptions] = useStorage<ISelectOption[]>('form.langOptions', [])
  const [langSelected] = useStorage('form.langSelected', 'pt-BR')
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

  return <Box>{isActive && <VoiceChatGPT />}</Box>
}
