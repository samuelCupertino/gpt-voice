import createCache from '@emotion/cache'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import type { PlasmoGetShadowHostId } from 'plasmo'
import { useEffect, useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { Content } from '~components/templates'
import { theme } from '~theme'
import { GPT_ORIGIN } from '~utils/constants'

const styleElement = document.createElement('style')

const styleCache = createCache({
  key: 'plasmo-mui-cache',
  prepend: true,
  container: styleElement
})

export const getStyle = () => styleElement

export const getShadowHostId: PlasmoGetShadowHostId = () => 'gpt-voice-shadow'

const IndexContent: React.FC = () => {
  const [isInChatGPT, setIsInChatGPT] = useState(false)
  const [, setHasTabChatGPT] = useStorage('tabs.hasTabChatGPT', false)

  chrome.runtime.onMessage.addListener((req) => {
    if (req.action === 'onChangeTab') {
      setHasTabChatGPT(req.hasTabChatGPT)
    }
  })

  useEffect(() => {
    const currentTab = window.location.href
    const newIsInChatGPT = currentTab?.startsWith(GPT_ORIGIN)

    setIsInChatGPT(newIsInChatGPT)
  }, [])

  if (!isInChatGPT) return

  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider theme={theme}>
        <Content />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default IndexContent
