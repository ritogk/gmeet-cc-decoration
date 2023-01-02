export interface oveserverInterface {
  startObserver: (
    element: Element,
    callback: (
      mutations: MutationRecord[],
      observer: MutationObserver
    ) => number
  ) => void
  stopObserver: () => void
}
