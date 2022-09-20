import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { devices } from './breakpoints'

export default function Container(props: PropsWithChildren) {
  return <ContainerStyled>{props.children}</ContainerStyled>
}

export const ContainerStyled = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - 20px);

  @media ${devices.tablet} {
    width: 84%;
  }
  @media ${devices.laptop} {
    width: 80%;
  }
`
