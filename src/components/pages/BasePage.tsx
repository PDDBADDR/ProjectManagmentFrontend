import { Outlet } from 'react-router-dom'
import Navbar from '../UI/Navbar'
import Logo from '../../../public/logo.svg'
import { Button } from '../UI/Buttons'
import styled from 'styled-components'
import Container from '../UI/Container'
import { useAppSelector } from '../../app/hooks'
import Avatar from '../UI/Avatar'

export default function BasePage() {
  const user = useAppSelector((state) => state.user)
  return (
    <MainWrapper>
      <Navbar>
        <Navbar.Logo img={Logo} />
        <Navbar.Menu>
          <Button to='index' buttonType='link'>
            Home
          </Button>
          <Button to='lolo2' buttonType='link'>
            Link 1
          </Button>
          <Button buttonType='link'>Link 2</Button>
          <Button buttonType='link'>Link 3</Button>
          {user.username && (
            <>
              <Button to='logout' buttonType='link'>
                Logout
              </Button>
              <Avatar username={user.username} />
            </>
          )}
          {!user.username && (
            <Button to='login' buttonType='filled'>
              Sign in
            </Button>
          )}
        </Navbar.Menu>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </MainWrapper>
  )
}

const MainWrapper = styled.main`
  margin-top: 100px;
  background-color: ${(p) => p.theme.bgPrimary};
  min-height: calc(100vh-100px);
`
