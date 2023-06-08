export const textToSpeech = (
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
