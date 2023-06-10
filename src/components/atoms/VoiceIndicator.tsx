import { Box, type BoxProps } from '@mui/material'
import type React from 'react'
import { Bars, Rings, ThreeCircles } from 'react-loader-spinner'

interface IVoiceIndicatorProps extends BoxProps {
  variant?: 'standard' | 'listening' | 'talking'
  width?: number
  height?: number
  visible?: boolean
  color?: string
}

export const VoiceIndicator: React.FC<IVoiceIndicatorProps> = ({
  variant = 'standard',
  width = 80,
  height = width,
  visible = true,
  color = '#75a99b',
  ...props
}) => {
  const indicatorProps = { height, width, visible, color }
  return (
    <Box {...props}>
      {variant === 'standard' && <Rings {...indicatorProps} />}
      {variant === 'listening' && <Bars {...indicatorProps} />}
      {variant === 'talking' && <ThreeCircles {...indicatorProps} />}
    </Box>
  )
}
