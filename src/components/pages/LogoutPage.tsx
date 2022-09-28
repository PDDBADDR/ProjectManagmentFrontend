import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'
import { resolve } from '../../routes'
import { Button } from '../UI/Buttons'
import { SlimWrapper } from '../UI/Wrappers'

export default function LogoutPage() {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.username) navigate(resolve('index'))
  }, [user])

  const yesHandler = () => {
    dispatch(logout())
    toast.success('You have logged out')
  }

  const noHander = () => {
    navigate(-1)
  }

  return (
    <SlimWrapper>
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <Button buttonProps={{ onClick: yesHandler }} buttonType='filled'>
        Yes
      </Button>
      <Button buttonProps={{ onClick: noHander }} buttonType='filled'>
        No
      </Button>
    </SlimWrapper>
  )
}
