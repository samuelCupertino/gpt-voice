import { Box, type BoxProps } from '@mui/material'
import type React from 'react'
import { useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { VoiceRecognition, VoiceSynthesis } from '~components/molecules'
import { chatGPT } from '~utils/functions'

export const VoiceChatGPT: React.FC<BoxProps> = (props) => {
  const [trigger, setTrigger] = useStorage('form.trigger', 'GPT')
  const [isEnabledVoiceRec, setIsEnabledVoiceRec] = useState(true)
  const [synthesizeText, setSynthesizeText] = useState('')

  const handleInputPrompt = (prompt: string) => {
    if (prompt.startsWith('mudar gatilho para ')) {
      chatGPT.input('')
      return
    }

    chatGPT.input(prompt)
  }

  const handleSpeakAnswer = (prompt) => {
    let retry = 0
    const intervalId = setInterval(() => {
      if (retry === 30) return clearInterval(intervalId)

      const lastAnswerText = chatGPT.getLastAnswer()
      const isLoadingAnswer = chatGPT.getIsLoadingAnswer()

      if (!isLoadingAnswer && lastAnswerText !== prompt) {
        setSynthesizeText(lastAnswerText)
        clearInterval(intervalId)
      }

      retry++
    }, 1000)
  }

  const handleSendPrompt = (prompt: string) => {
    if (!prompt) return

    if (prompt.startsWith('mudar gatilho para ')) {
      const newTarget = prompt.replace('mudar gatilho para ', '')
      setTrigger(newTarget)
      return
    }

    chatGPT.send()
    handleSpeakAnswer(prompt)
  }

  return (
    <Box
      position="fixed"
      top={2}
      left="50%"
      sx={{ transform: 'translate(-50%)', cursor: 'pointer' }}
      onClick={() => {
        setSynthesizeText(
          `Fale o gatilho precedido de seu prompt para o chat. Por exemplo: ${trigger}, qual a data de hoje?`
        )
        setTimeout(() => setSynthesizeText(''), 1)
      }}
      {...props}>
      <VoiceSynthesis
        text={synthesizeText}
        onStart={() => setIsEnabledVoiceRec(false)}
        onEnd={() => setIsEnabledVoiceRec(true)}
      />
      <VoiceRecognition
        trigger={trigger}
        isEnabled={isEnabledVoiceRec}
        onTranscribing={handleInputPrompt}
        onTranscriptEnd={handleSendPrompt}
      />
    </Box>
  )
}
