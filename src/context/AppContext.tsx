import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import { combineProviders, Provider } from '../utils/context'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as StoreProvider } from 'react-redux'
import darkTheme from '../themes/dark'
import lightTheme from '../themes/light'
import { persistor, store } from '../app/store'

export default function AppContext(props: PropsWithChildren) {
  const providers: Provider[] = [
    {
      component: ThemeProvider,
      props: { theme: darkTheme },
    },
    {
      component: StoreProvider,
      props: { store: store },
    },
    {
      component: PersistGate,
      props: { persistor: persistor },
    },
  ]

  const CombinedProvider = combineProviders(providers)
  return <CombinedProvider>{props.children}</CombinedProvider>
}
