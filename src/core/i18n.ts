export const getMessage = (message: string) => {
  return chrome.i18n.getMessage(message)
}

export const getLanguage = () => {
  return chrome.i18n.getUILanguage()
}
