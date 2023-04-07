export const generateMessage = (
  lang: string,
  ccArea: HTMLElement | null,
  controlArea: HTMLElement | null,
  controlCcButton: HTMLElement | null,
  usersArea: HTMLElement | null,
  bodyOuterText: string
) => {
  const errorReport = {
    lang: lang,
    ccArea: ccArea ? "○" : "✕",
    controlArea: controlArea ? "○" : "✕",
    controlCcButton: controlCcButton ? "○" : "✕",
    usersArea: usersArea ? "○" : "✕",
    bodyOuterText: bodyOuterText,
  }
  return JSON.stringify(errorReport, null, 2)
}
