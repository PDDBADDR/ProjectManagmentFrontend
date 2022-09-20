import { darken, lighten } from 'polished'
import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { resolve } from '../../routes'
import { contrast } from '../../utils/styling'

interface ButtonStyleProps {
  textColor?: color
  bgColor?: color
}

interface ButtonProps extends PropsWithChildren {
  buttonType: keyof typeof buttonTypes
  href?: string
  style?: ButtonStyleProps
}

export function Button(props: ButtonProps) {
  const ButtonComp = buttonTypes[props.buttonType]
  const navigate = useNavigate()
  const onClick = () => {
    if (props.href) navigate(resolve(props.href))
  }
  return (
    <ButtonComp onClick={onClick} {...props.style}>
      {props.children}
    </ButtonComp>
  )
}

const BaseButton = styled.a<ButtonStyleProps>`
  padding: 10px;
  text-decoration: none;
  letter-spacing: 1px;
  color: ${(p) => (p.textColor ? p.theme[p.textColor] : p.theme.muted)};

  transition: all 0.15s ease-in-out;

  &:hover {
    color: ${(p) => darken(0.1, p.textColor ? p.theme[p.textColor] : p.theme.muted)};
    cursor: pointer;
  }
`

const ButtonLinkStyled = styled(BaseButton)``

const ButtonFilledStyled = styled(BaseButton)`
  border-radius: 5px;
  background-color: ${(p) => (p.bgColor ? p.theme[p.bgColor] : p.theme.primary)};
  color: ${(p) => (p.textColor ? p.theme[p.textColor] : '#fff')};

  &:hover {
    background-color: ${(p) =>
      contrast(0.05, p.bgColor ? p.theme[p.bgColor] : p.theme.primary, p.theme.contrast)};
    color: ${(p) => lighten(0.1, p.textColor ? p.theme[p.textColor] : '#fff')};
    cursor: pointer;
  }
`

const buttonTypes = {
  link: ButtonLinkStyled,
  filled: ButtonFilledStyled,
}
