export const textToSpeech = (
  text = 'Mande um texto para eu falar',
  {
    voiceName = 'Google português do Brasil',
    voiceLang = 'pt-BR',
    volume = 1,
    speed = 1,
    pitch = 1,
    onStart = () => {},
    onEnd = () => {}
  } = {}
) => {
  if (!('speechSynthesis' in window)) {
    console.log('O navegador não suporta a síntese de fala.')
    return
  }

  const startSpeech = () => {
    const voices = window.speechSynthesis.getVoices()
    const selectedVoice =
      voices.find((voice) => voice.name === voiceName) ||
      voices.find((voice) => voice.lang === voiceLang)

    if (!selectedVoice) {
      console.log('A voz selecionada não está disponível.')
      return
    }

    const utterance = new SpeechSynthesisUtterance()
    utterance.text = text
    utterance.voice = selectedVoice
    utterance.volume = volume * 0.1
    utterance.rate = speed
    utterance.pitch = pitch
    utterance.onstart = onStart
    utterance.onend = onEnd

    window.speechSynthesis.speak(utterance)
  }

  if (!window.speechSynthesis.onvoiceschanged) {
    window.speechSynthesis.onvoiceschanged = startSpeech
    return
  }

  startSpeech()
}
