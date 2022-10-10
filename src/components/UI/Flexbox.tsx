/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components'
import { devices, sizeName } from './breakpoints'

type ColProps = {
  [T in typeof sizeName[number]]?: number
}

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Col = styled.div<ColProps>`
  flex: 0 0 100%;
  width: 100%;
  max-width: 100%;

  ${(p) => {
    let result = ''
    for (const [key, value] of Object.entries(p)) {
      result += `
        @media ${(devices as any)[key]} {
        flex: 0 0 ${value}%;
        width: 100%;
        max-width: ${value}%;
    `
    }
    return result
  }}
`
