export const chatGPT = {
  input: (text: string) => {
    console.log({ text })
    const textAreaEl = document.getElementById(
      'prompt-textarea'
    ) as HTMLInputElement

    console.log({ textAreaEl, text })
    if (textAreaEl) {
      textAreaEl.value = text
      textAreaEl.dispatchEvent(new Event('input', { bubbles: true }))
    }
  },
  send: () => {
    const sendButtonEl = document.querySelector(
      '#prompt-textarea~button'
    ) as HTMLButtonElement

    if (sendButtonEl) sendButtonEl.click()
  }
}
