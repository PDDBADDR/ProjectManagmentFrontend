import React, { ComponentType, FC, PropsWithChildren, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

export interface Provider {
  component: ComponentType<PropsWithChildren<any>>
  props: any
}

export const combineProviders = (providers: Provider[]) => {
  return providers.reduce(
    (Prev, curr) => {
      return (currProps: PropsWithChildren<any>): JSX.Element => {
        return (
          <Prev>
            <curr.component {...curr.props}>{currProps.children}</curr.component>
          </Prev>
        )
      }
    },
    (currProps: PropsWithChildren<any>) => <>{currProps.children}</>,
  )
}
