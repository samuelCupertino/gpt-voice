import { Box, type BoxProps } from '@mui/material'
import type React from 'react'
import { useState } from 'react'

import { VoiceRecognition, VoiceSynthesis } from '~components/molecules'
import { chatGPT } from '~utils/functions'

export const VoiceChatGPT: React.FC<BoxProps> = (props) => {
  const [isEnabledVoiceRec, setIsEnabledVoiceRec] = useState(true)
  const [synthesizeText, setSynthesizeText] = useState('')

  const handleInputPrompt = (prompt: string) => {
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

  const handleSendPrompt = (prompt) => {
    if (!prompt) return

    chatGPT.send()
    handleSpeakAnswer(prompt)
  }

  return (
    <Box
      position="fixed"
      top={2}
      left="50%"
      sx={{ transform: 'translate(-50%)' }}
      {...props}>
      <VoiceSynthesis
        text={synthesizeText}
        onStart={() => setIsEnabledVoiceRec(false)}
        onEnd={() => setIsEnabledVoiceRec(true)}
      />
      <VoiceRecognition
        trigger="GPT"
        isEnabled={isEnabledVoiceRec}
        onTranscribing={handleInputPrompt}
        onTranscriptEnd={handleSendPrompt}
      />
    </Box>
  )
}
