import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../app/hooks'
import { useSignupMutation } from '../../features/auth/authApi'
import { resolve } from '../../routes'
import { Button } from '../UI/Buttons'
import Form from '../UI/Form'
import { SlimWrapper } from '../UI/Wrappers'

interface SignupFormInput {
  email: string
  username: string
  password: string
  password_confirm: string
}

export default function SignupPage() {
  const { register, handleSubmit } = useForm<SignupFormInput>()
  const user = useAppSelector((state) => state.user)
  const [signup] = useSignupMutation()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<SignupFormInput> = async (data) => {
    if (data.password !== data.password_confirm) {
      toast.error('The passwords given are different')
      return
    }
    try {
      await signup(data).unwrap()
      toast.success('Now you can log in')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: { detail: string } | any) {
      const errorMsg =
        error.status === 'FETCH_ERROR' ? 'An unidentified error has occurred' : error.data.detail
      toast.error(errorMsg)
    }
  }

  useEffect(() => {
    if (user.username) navigate(resolve('index'))
  }, [user])

  return (
    <SlimWrapper>
      <h2>Sign up</h2>
      <Form formProps={{ onSubmit: handleSubmit(onSubmit) }}>
        <Form.Label>E-mail</Form.Label>
        <Form.Input inputProps={{ type: 'email', ...register('email') }} />
        <Form.Label>Username</Form.Label>
        <Form.Input inputProps={{ type: 'text', ...register('username') }} />
        <Form.Label>Password</Form.Label>
        <Form.Input inputProps={{ type: 'password', ...register('password') }} />
        <Form.Label>Confirm password</Form.Label>
        <Form.Input inputProps={{ type: 'password', ...register('password_confirm') }} />
        <Button buttonType='filled' buttonProps={{ type: 'submit' }}>
          Sign up
        </Button>
      </Form>
    </SlimWrapper>
  )
}
