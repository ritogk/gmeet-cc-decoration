export const getMessage = (message: string) => {
  return chrome.i18n.getMessage(message)
}
