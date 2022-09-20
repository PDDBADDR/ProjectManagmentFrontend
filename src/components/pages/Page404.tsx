import { between } from 'polished'
import styled from 'styled-components'
import notFound from '../../assets/img/notFound.svg'

export default function Page404() {
  return (
    <MainWrapper>
      <ImageStyled src={notFound} />
      <h1>Page not found</h1>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(p) => p.theme.primary};
`

const ImageStyled = styled.img`
  width: ${between('200px', '400px')};
  height: auto;
`
