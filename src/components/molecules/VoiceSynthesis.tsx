import { Box, type BoxProps } from '@mui/material'
import type React from 'react'
import { useEffect, useState } from 'react'

import { VoiceIndicator } from '~components/atoms'
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

  useEffect(() => {
    textToSpeech(text, {
      onStart: () => {
        onStart()
        setIsTalking(true)
      },
      onEnd: () => {
        onEnd()
        setIsTalking(false)
      }
    })
  }, [text])

  return (
    <Box {...props}>{isTalking && <VoiceIndicator variant="talking" />}</Box>
  )
}
