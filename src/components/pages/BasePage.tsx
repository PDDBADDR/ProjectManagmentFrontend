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

          {user.username && (
            <Button to='dashboard' buttonType='link'>
              Dashboard
            </Button>
          )}
          {user.username && (
            <>
              <Button to='logout' buttonType='link'>
                Logout
              </Button>
              <Avatar username={user.username} />
            </>
          )}
          {!user.username && (
            <>
              <Button to='login' buttonType='link'>
                Sign in
              </Button>
              <Button to='signup' buttonType='filled'>
                Sign up
              </Button>
            </>
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
  padding-top: 100px;
  background-color: ${(p) => p.theme.bgPrimary};
  color: ${(p) => p.theme.primaryFont};
  min-height: calc(100vh - 100px);
`
