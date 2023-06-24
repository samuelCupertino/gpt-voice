import { Box, type BoxProps } from '@mui/material'
import type React from 'react'
import { useEffect } from 'react'

import { VoiceIndicator } from '~components/atoms'
import { useSpeechRecognition } from '~utils/hooks'

interface IVoiceRecognitionProps extends BoxProps {
  trigger: string
  isEnabled?: boolean
  onTranscribing?: (text: string) => void
  onTranscriptEnd?: (text: string) => void
}

export const VoiceRecognition: React.FC<IVoiceRecognitionProps> = ({
  trigger,
  isEnabled = true,
  onTranscribing,
  onTranscriptEnd,
  ...props
}) => {
  const { transcript, isFinal } = useSpeechRecognition({ isEnabled })

  useEffect(() => {
    const isValidCommand = transcript.startsWith(trigger)
    if (!isValidCommand) return

    const command = transcript.slice(trigger.length + 1)
    onTranscribing(command)
  }, [transcript])

  useEffect(() => {
    if (isFinal) {
      const command = transcript.slice(trigger.length + 1)
      onTranscriptEnd(command)
    }
  }, [isFinal, transcript, onTranscriptEnd])

  if (!isEnabled) return

  return (
    <Box {...props}>
      <VoiceIndicator
        variant={transcript.includes(trigger) ? 'listening' : 'standard'}
      />
    </Box>
  )
}
