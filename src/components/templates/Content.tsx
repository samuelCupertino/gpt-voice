import { Box } from '@mui/material'
import type React from 'react'
import { useEffect } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { VoiceChatGPT } from '~components/organisms'
import { GPT_ORIGIN } from '~utils/constants'

export const Content: React.FC = () => {
  const [isActive, setIsActive] = useStorage<boolean>('isActive')
  const [currentTab, setCurrentTab] = useStorage<string>('currentTab')
  const isInChatGPT = currentTab?.includes(GPT_ORIGIN)

  useEffect(() => {
    const handleUpdateTab = () => {
      if (!window.location.href.includes(GPT_ORIGIN)) {
        setIsActive(false)
      }
      setCurrentTab(window.location.href)
    }

    handleUpdateTab()
    window.addEventListener('focus', handleUpdateTab)
    return () => window.removeEventListener('focus', handleUpdateTab)
  }, [])

  if (!isActive || !isInChatGPT) return

  return (
    <Box>
      <VoiceChatGPT />
    </Box>
  )
}
