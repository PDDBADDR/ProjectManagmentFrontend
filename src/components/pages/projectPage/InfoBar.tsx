import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { darken } from 'polished'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { InfoBarContext } from '../../../context/InfoBarContext'
import { Button } from '../../UI/Buttons'

interface InfoBarProps {
  onRemoveTask: (id: number) => void
  onRemoveStatus: (id: number) => void
}

export default function InfoBar(props: InfoBarProps) {
  const { object, setObject } = useContext(InfoBarContext)

  useEffect(() => {
    console.log(object)
  }, [object])
  return (
    <InfoBarStyled show={object !== undefined}>
      <InfoBarHeaderStyled>
        <span>
          <Button
            buttonType='icon'
            style={{ fontSize: 1.3 }}
            buttonProps={{
              onClick: () => {
                setObject(undefined)
              },
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </span>
        Details
      </InfoBarHeaderStyled>
      <InfoBarBodyStyled>
        <Button
          buttonType='filled'
          buttonProps={{
            onClick: () => {
              props.onRemoveTask(object.id)
            },
          }}
        >
          Delete
        </Button>
        <h3>{object?.name}</h3>
        <div>{object?.description}</div>
      </InfoBarBodyStyled>
    </InfoBarStyled>
  )
}

const InfoBarStyled = styled.div<{ show: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: clamp(220px, 70vw, 500px);
  right: ${(p) => (p.show ? '0' : '-501px')};
  top: 80px;
  bottom: 0;
  border-left: 1px solid ${(p) => darken(0.1, p.theme.bgSecondary)};
  background-color: ${(p) => p.theme.bgSecondary};

  transition: 0.1s ease-in-out;
`

const InfoBarHeaderStyled = styled.div`
  border-bottom: 1px solid ${(p) => darken(0.1, p.theme.bgSecondary)};
  font-size: 1.3rem;
  padding: 10px;
  text-align: center;
  position: relative;
  span {
    position: absolute;
    height: fit-content;
    left: 5px;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
`

const InfoBarBodyStyled = styled.div`
  padding: 10px;
  overflow-y: auto;
  margin: 0 0;
  div {
    white-space: pre-wrap;
    font-size: 1rem;
    font-weight: lighter;
  }
`
