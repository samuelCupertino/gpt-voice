import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import type { PlasmoGetShadowHostId } from 'plasmo'

import { Popup } from '~components/templates'
import { theme } from '~theme'

const styleElement = document.createElement('style')

const styleCache = createCache({
  key: 'plasmo-mui-cache',
  prepend: true,
  container: styleElement
})

const textToSpeech = (
  text = 'Mande um texto para eu falar',
  { voiceName = 'Luciana', speed = 1 } = {}
) => {
  if (!('speechSynthesis' in window)) {
    console.log('O navegador não suporta a síntese de fala.')
    return
  }

  const voices = window.speechSynthesis.getVoices()
  const selectedVoice = voices.find((voice) => voice.name === voiceName)

  if (!selectedVoice) {
    console.log('A voz selecionada não está disponível.')
    return
  }

  const utterance = new SpeechSynthesisUtterance()
  utterance.text = text
  utterance.voice = selectedVoice
  utterance.rate = speed

  window.speechSynthesis.speak(utterance)
}

const IndexContent: React.FC = () => {
  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider theme={theme}>
        <Box bgcolor={'red'} onClick={() => textToSpeech('ola')}>
          <Popup />
        </Box>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default IndexContent
