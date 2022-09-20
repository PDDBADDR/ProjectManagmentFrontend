import { darken } from 'polished'
import { PropsWithChildren, useState } from 'react'
import styled from 'styled-components'
import { devices } from './breakpoints'
import { ContainerStyled } from './Container'

interface LogoProps {
  img: string
}

export default function Navbar(props: PropsWithChildren) {
  return (
    <NavbarStyled>
      <NavbarContainerStyled>{props.children}</NavbarContainerStyled>
    </NavbarStyled>
  )
}

function Logo(props: LogoProps) {
  return <LogoStyled src={props.img} />
}

function Menu(props: PropsWithChildren) {
  const [isActive, setisActive] = useState(false)
  return (
    <>
      <MenuIcon isActive={isActive} setIsActive={setisActive} />
      <MenuStyled isActive={isActive}>{props.children}</MenuStyled>
    </>
  )
}

function MenuIcon(props: { isActive: boolean; setIsActive: (state: boolean) => void }) {
  return (
    <MenuIconStyled isActive={props.isActive} onClick={() => props.setIsActive(!props.isActive)}>
      <div></div>
      <div></div>
      <div></div>
    </MenuIconStyled>
  )
}

Navbar.Logo = Logo
Navbar.Menu = Menu

export const NavbarStyled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 80px;

  background-color: ${(p) => p.theme.bgSecondary};
  border-bottom: 1px solid ${(p) => darken(0.1, p.theme.bgSecondary)};
`

export const LogoStyled = styled.img`
  height: 60px;
  width: auto;
`

export const MenuStyled = styled.div<{ isActive: boolean }>`
  background-color: ${(p) => p.theme.bgSecondary};

  display: flex;
  flex-direction: column;
  position: fixed;
  width: 200px;
  left: -200px;
  top: 80px;
  bottom: 0;
  border-right: 1px solid ${(p) => darken(0.1, p.theme.bgSecondary)};

  transition: all 0.3s ease-in;

  ${({ isActive }) =>
    isActive &&
    `
    left: 0;
  `}

  @media ${devices.tablet} {
    display: block;
    position: static;
    height: auto;
    width: auto;
  }
`

const NavbarContainerStyled = styled(ContainerStyled)`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`

const MenuIconStyled = styled.div<{ isActive: boolean }>`
  @media ${devices.tablet} {
    display: none;
  }

  cursor: pointer;

  div {
    height: 2px;
    width: 30px;
    margin-bottom: 7px;
    background-color: ${(p) => p.theme.primary};

    transition: all 0.5s ease-in-out;
  }

  ${({ isActive }) =>
    isActive &&
    `
    div:nth-child(1){
      transform: translate(0, 9px) rotate(-45deg) ;
    }
    div:nth-child(2){
      opacity: 0;
    }
    div:nth-child(3){
      transform: translate(0, -9px) rotate(45deg) ;
    }
  `}
`
