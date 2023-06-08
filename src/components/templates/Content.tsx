import { Box } from '@mui/material'
import type React from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { useSpeechRecognition } from '~utils/hooks'

export const Content: React.FC = () => {
  const [isActive] = useStorage<boolean>('isActive')
  const { transcript } = useSpeechRecognition({ isActive })

  if (!isActive) return

  return (
    <Box width={200} height={200} bgcolor="red">
      <Box>Content: {transcript}</Box>
      <Box>isActive: {String(isActive)}</Box>
    </Box>
  )
}
