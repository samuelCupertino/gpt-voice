import { Box, Stack } from '@mui/material'
import type React from 'react'
import { useEffect } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { RecognitionVoice } from '~components/organisms'

export const Content: React.FC = () => {
  const [isActive] = useStorage<boolean>('isActive')

  return (
    <Stack alignItems="center" width="100vw" mt={2}>
      {isActive && <RecognitionVoice />}
    </Stack>
  )
}
