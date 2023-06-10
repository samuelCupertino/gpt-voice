export const chatGPT = {
  input: (text: string) => {
    const textAreaEl = document.getElementById(
      'prompt-textarea'
    ) as HTMLInputElement

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
  },

  getLastAnswer: () => {
    const lastAnswerEl = document
      .querySelector(
        '#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div.flex-1.overflow-hidden > div > div > div > div:last-child'
      )
      .previousElementSibling.querySelector('.markdown')

    const lastAnswerText = [...lastAnswerEl.children].reduce(
      (acc, cur) => (cur.tagName === 'PRE' ? acc : acc + cur.textContent),
      ''
    )

    return /\w/.test(lastAnswerText) ? lastAnswerText : ''
  },

  getIsLoadingAnswer: () => {
    const loadingEl = document
      .getElementById('prompt-textarea')
      .parentElement.querySelector('.text-2xl')

    return !!loadingEl
  }
}
