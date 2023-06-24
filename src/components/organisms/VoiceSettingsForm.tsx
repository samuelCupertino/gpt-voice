import { Button, Divider, Stack } from '@mui/material'
import type React from 'react'
import { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'

import { useStorage } from '@plasmohq/storage/hook'

import {
  type ISelectOption,
  SelectField,
  SliderField,
  SwitchField,
  TextField
} from '~components/molecules'
import { GPT_ORIGIN } from '~utils/constants'
import { textToSpeech } from '~utils/functions'

export const VoiceSettingsForm: React.FC = () => {
  const [hasTabChatGPT] = useStorage('tabs.hasTabChatGPT', false)
  const [isActive, setIsActive] = useStorage('form.isActive', false)
  const [trigger, setTrigger] = useStorage('form.trigger', 'GPT')
  const [langOptions] = useStorage<ISelectOption[]>('form.langOptions', [])
  const [langSelected, setLangSelected] = useStorage(
    'form.langSelected',
    'pt-BR'
  )
  const [voiceOptions] = useStorage<ISelectOption[]>('form.voiceOptions', [])
  const [voiceSelected, setVoiceSelected] = useStorage('form.voiceSelected', '')
  const [speed, setSpeed] = useStorage('form.speed', 1)
  const [pitch, setPitch] = useStorage('form.pitch', 1)
  const [volume, setVolume] = useStorage('form.volume', 9)
  const [isTesting, setIsTesting] = useState(false)
  const isFormDisabled = !isActive || !hasTabChatGPT

  const handleSelectVoiceDefault = () => {
    if (!voiceOptions?.[0]?.value) return

    setVoiceSelected((preVoice) => {
      const noVoice = voiceOptions.every((voice) => voice.value !== preVoice)
      return noVoice ? voiceOptions[0].value : preVoice
    })
  }
  useEffect(handleSelectVoiceDefault, [voiceOptions, setVoiceSelected])

  const handleResetSettings = () => {
    setIsActive(true)
    setTrigger('GPT')
    setLangSelected('pt-BR')
    setVoiceSelected('Google português do Brasil')
    setSpeed(1)
    setPitch(1)
    setVolume(9)
  }

  const handleTestSettings = () => {
    setIsTesting(true)
    setIsActive(false)

    textToSpeech(
      `Fale: o gatilho precedido de seu prompt para o chat. Por exemplo: ${trigger}, qual a data de hoje?`,
      {
        voiceLang: langSelected,
        voiceName: voiceSelected,
        volume,
        speed,
        pitch,
        onEnd: () => {
          setIsTesting(false)
          setIsActive(true)
        }
      }
    )
  }

  return (
    <Stack gap={2}>
      {hasTabChatGPT ? (
        <SwitchField
          label="Ativar GPT Voice"
          value={isActive}
          onChange={setIsActive}
        />
      ) : (
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ marginBottom: 1 }}
          onClick={() => window.open(GPT_ORIGIN, '_blank')}>
          Acessar o ChatGPT
        </Button>
      )}

      <Divider sx={{ marginBottom: 2 }} />

      <TextField
        label="Gatilho"
        helperText={`Fale: ${trigger}, mudar gatilho para (novo_gatilho)`}
        sx={{ pointerEvents: 'none' }}
        disabled={isFormDisabled}
        value={trigger}
        onChange={setTrigger}
      />

      <SelectField
        label="Idioma"
        options={langOptions}
        disabled={isFormDisabled}
        value={langSelected}
        onChange={setLangSelected}
      />

      <SelectField
        label="Voz"
        options={voiceOptions}
        disabled={isFormDisabled}
        value={voiceSelected}
        onChange={setVoiceSelected}
      />

      <SliderField
        label="Volume"
        disabled={isFormDisabled}
        step={1}
        min={1}
        max={10}
        marks
        value={volume}
        onChange={setVolume}
      />

      <SliderField
        label="Velocidade"
        disabled={isFormDisabled}
        step={0.1}
        min={0.1}
        max={2}
        marks
        value={speed}
        onChange={setSpeed}
      />

      <SliderField
        label="Tonalidade"
        disabled={isFormDisabled}
        step={0.1}
        min={0.1}
        max={2}
        marks
        value={pitch}
        onChange={setPitch}
      />

      <Stack direction="row" gap={2}>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          disabled={isFormDisabled}
          onClick={handleResetSettings}>
          Resetar
        </Button>

        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={isFormDisabled}
          onClick={handleTestSettings}>
          {isTesting ? <ThreeDots color="#19c37d" height={10} /> : 'Testar'}
        </Button>
      </Stack>
    </Stack>
  )
}
