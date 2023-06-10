import { Box, FormControlLabel, Stack, Switch } from '@mui/material'
import type React from 'react'

import { useStorage } from '@plasmohq/storage/hook'

export const Popup: React.FC = () => {
  const [currentTab] = useStorage<string>('currentTab')
  const [isActive, setIsActive] = useStorage<boolean>(`isActive`)
  const isInChatGPT = currentTab?.includes('https://chat.openai.com/')

  if (!isInChatGPT) {
    return <Box width={230}>Acesse o site do ChatGPT para ativar!</Box>
  }

  return (
    <Stack gap={2} width={230}>
      <Box
        bgcolor="secondary.200"
        color="secondary.900"
        borderRadius={1}
        px={2}
        py={1}>
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
          }
          label="Ativar GPT Voice"
        />
      </Box>
    </Stack>
  )
}
