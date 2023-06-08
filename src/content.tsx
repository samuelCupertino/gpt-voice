import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import type { PlasmoGetShadowHostId } from 'plasmo'

import { Content } from '~components/templates'
import { theme } from '~theme'

const styleElement = document.createElement('style')

const styleCache = createCache({
  key: 'plasmo-mui-cache',
  prepend: true,
  container: styleElement
})

export const getStyle = () => styleElement

export const getShadowHostId: PlasmoGetShadowHostId = () => 'gpt-voice-shadow'

const IndexContent: React.FC = () => {
  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider theme={theme}>
        <Content />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default IndexContent
