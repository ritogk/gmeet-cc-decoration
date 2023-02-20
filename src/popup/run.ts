import { main } from "@/popup/main"

export const run = async (): Promise<void> => {
  main()
}

window.addEventListener("load", run, false)
