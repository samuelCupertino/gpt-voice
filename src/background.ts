import { GPT_ORIGIN } from '~utils/constants'

const handleOnChangeTab = () => {
  chrome.tabs.query({}, (tabs) => {
    const tabUrls = tabs.map((tab) => tab.url)
    const hasTabChatGPT = tabUrls.some((url) => url.startsWith(GPT_ORIGIN))

    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { action: 'onChangeTab', hasTabChatGPT })
    })
  })
}

chrome.tabs.onActivated.addListener(handleOnChangeTab)
chrome.tabs.onUpdated.addListener(handleOnChangeTab)
chrome.tabs.onRemoved.addListener(handleOnChangeTab)
