export interface videoCcAreasInterface {
  deleteAll: () => void
  appendVideoCcElement: (name: string, speach: string) => void
  updateVideoCcElement: (name: string, speach: string) => void
  existVideoCc: (name: string) => boolean
}
