import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { contrast } from '../../utils/styling'
import { Button } from './Buttons'

export interface ModalProps extends PropsWithChildren {
  title: string
  show: boolean
  onClose: () => void
}

interface ModalStyledProps {
  show: boolean
}

export default function Modal(props: ModalProps) {
  return (
    <ModalWrapperStyled show={props.show}>
      <ModalStyled>
        <ModalHeaderStyled>
          <div>{props.title}</div>
          <Button
            buttonType='link'
            buttonProps={{ onClick: props.onClose }}
            style={{ fontSize: 1.2 }}
          >
            &#x2715;
          </Button>
        </ModalHeaderStyled>
        <ModalBodyStyled>{props.children}</ModalBodyStyled>
      </ModalStyled>
    </ModalWrapperStyled>
  )
}

const ModalWrapperStyled = styled.div<ModalStyledProps>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: ${(p) => (p.show ? 'flex' : 'none')};
  background-color: #33333399;
  justify-content: center;
  align-items: center;
  z-index: 99999;

  & div {
    display-flex;
    align-items: center;
  }
`

const ModalStyled = styled.div`
  position: fixed;
  margin: auto;

  width: clamp(220px, 80vw, 600px);
  background-color: ${(p) => p.theme.bgPrimary};
  border: 1px solid ${(p) => contrast(0.2, p.theme.bgSecondary, p.theme.contrast)};
  border-radius: 5px;
`

const ModalHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid ${(p) => contrast(0.2, p.theme.bgSecondary, p.theme.contrast)};
`

const ModalBodyStyled = styled.div`
  padding: 10px;
`
