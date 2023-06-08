import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, FormControlLabel, Stack, Switch } from '@mui/material'
import type React from 'react'

import { useStorage } from '@plasmohq/storage/hook'

export const Popup: React.FC = () => {
  const [isActive, setIsActive] = useStorage<boolean>('isActive')
  //#19c37d
  //#75a99b
  // #202123
  // #343640
  //#444654
  //#b91c1b
  return (
    <Stack gap={2} width={220}>
      <Button
        variant="contained"
        href="https://chat.openai.com"
        startIcon={<DeleteIcon />}>
        Acessar Chat GPT
      </Button>

      <Box bgcolor="#75a99b" borderRadius={1} px={2} py={1}>
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
