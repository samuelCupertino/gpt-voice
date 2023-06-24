import { Box } from '@mui/material'
import type React from 'react'

import { Footer, VoiceSettingsForm } from '~components/organisms'

export const Popup: React.FC = () => (
  <Box px={2} py={1} width={300}>
    <VoiceSettingsForm />

    <Footer mt={3} />
  </Box>
)
