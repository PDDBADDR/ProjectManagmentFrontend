import { createContext, PropsWithChildren, useState } from 'react'

interface InfoBarContextObject {
  id: number
  type: 'STATUS' | 'TASK'
  name: string
  description?: string
}

interface InfoBarContextState {
  object?: InfoBarContextObject
  setObject: (obj?: InfoBarContextObject) => void
}

const infoBarContextInitial: InfoBarContextState = {
  object: undefined,
  setObject: () => {
    return
  },
}

export const InfoBarContext = createContext<InfoBarContextState>(infoBarContextInitial)

export function InfoBarContextProvider(props: PropsWithChildren) {
  const [object, setObject] = useState<InfoBarContextObject | undefined>(undefined)

  return (
    <InfoBarContext.Provider value={{ object, setObject }}>
      {props.children}
    </InfoBarContext.Provider>
  )
}
