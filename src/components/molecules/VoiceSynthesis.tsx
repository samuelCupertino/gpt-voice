import { Box, type BoxProps } from '@mui/material'
import type React from 'react'
import { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'

import { textToSpeech } from '~utils/functions'

interface IVoiceSynthesisProps extends BoxProps {
  text: string
  onStart: () => void
  onEnd: () => void
}

export const VoiceSynthesis: React.FC<IVoiceSynthesisProps> = ({
  text,
  onStart,
  onEnd,
  ...props
}) => {
  const [isSpecking, setIsSpecking] = useState(false)

  useEffect(() => {
    textToSpeech(text, {
      onStart: () => {
        onStart()
        setIsSpecking(true)
      },
      onEnd: () => {
        onEnd()
        setIsSpecking(false)
      }
    })
  }, [text])

  return (
    <Box {...props} onClick={() => textToSpeech(text, { onStart, onEnd })}>
      {isSpecking && (
        <ThreeCircles height={80} width={80} color="red" visible={true} />
      )}
    </Box>
  )
}
