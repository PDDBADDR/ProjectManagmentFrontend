import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import { combineProviders, Provider } from './utils'
import lightTheme from '../themes/light'

export default function AppContext(props: PropsWithChildren) {
  const providers: Provider[] = [
    {
      component: ThemeProvider,
      props: { theme: lightTheme },
    },
  ]

  const CombinedProvider = combineProviders(providers)
  return <CombinedProvider>{props.children}</CombinedProvider>
}
