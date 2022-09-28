import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../app/hooks'
import { useLoginMutation } from '../../features/auth/authApi'
import { resolve } from '../../routes'
import { Button } from '../UI/Buttons'
import Form from '../UI/Form'
import { SlimWrapper } from '../UI/Wrappers'

interface LoginFormInput {
  username: string
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormInput>()
  const user = useAppSelector((state) => state.user)
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      await login(data).unwrap()
      toast.success('You are logged in')
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
      <h2>Sign in</h2>
      <Form formProps={{ onSubmit: handleSubmit(onSubmit) }}>
        <Form.Label>Username</Form.Label>
        <Form.Input inputProps={{ type: 'text', ...register('username') }} />
        <Form.Label>Password</Form.Label>
        <Form.Input inputProps={{ type: 'password', ...register('password') }} />
        <Button buttonType='filled' buttonProps={{ type: 'submit' }}>
          Sign in
        </Button>
      </Form>
    </SlimWrapper>
  )
}
