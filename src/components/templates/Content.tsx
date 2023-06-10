import { Box } from '@mui/material'
import type React from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { VoiceChatGPT } from '~components/organisms'

export const Content: React.FC = () => {
  const [isActive] = useStorage<boolean>('isActive')

  return <Box>{isActive && <VoiceChatGPT />}</Box>
}
