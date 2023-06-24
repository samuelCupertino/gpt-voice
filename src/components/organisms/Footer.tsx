import { Box, type BoxProps, Divider, Link, Typography } from '@mui/material'
import type React from 'react'

import { GPT_ORIGIN } from '~utils/constants'

export const Footer: React.FC<BoxProps> = (props) => (
  <Box {...props}>
    <Divider sx={{ marginBottom: 2 }} />
    <Typography fontSize={14} color="gray">
      Acesse o{' '}
      <Link
        variant="body2"
        sx={{ cursor: 'pointer' }}
        onClick={() => window.open(GPT_ORIGIN, '_blank')}>
        ChatGPT
      </Link>{' '}
      para utilizar a extensão.
    </Typography>
    <Typography fontSize={14} color="gray">
      Desenvolvido por{' '}
      <Link
        variant="body2"
        sx={{ cursor: 'pointer' }}
        onClick={() => window.open('https://samuelcupertino.dev', '_blank')}>
        Samuel Cupertino
      </Link>
      .
    </Typography>
  </Box>
)
