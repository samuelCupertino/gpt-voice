import type React from 'react'
import { useEffect } from 'react'
import { ThreeCircles } from 'react-loader-spinner'

import { chatGPT } from '~utils/functions'
import { useSpeechRecognition } from '~utils/hooks'

export const RecognitionVoice: React.FC = () => {
  const { transcript, isFinal } = useSpeechRecognition()

  useEffect(() => {
    const isValidCommand = transcript.startsWith('GPT')
    if (!isValidCommand) return

    const command = transcript.slice(4)
    chatGPT.input(command)
  }, [transcript])

  useEffect(() => {
    if (isFinal) chatGPT.send()
  }, [isFinal, chatGPT])

  return (
    <>
      transcript:{transcript}
      <ThreeCircles height={80} width={80} color="#75a99b" visible={true} />
    </>
  )
}
