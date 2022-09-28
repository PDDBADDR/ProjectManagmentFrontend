import {
  FormHTMLAttributes,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  PropsWithChildren,
} from 'react'
import styled from 'styled-components'

interface FormProps extends PropsWithChildren {
  formProps: FormHTMLAttributes<HTMLFormElement>
}

interface InputProps {
  inputProps: InputHTMLAttributes<HTMLInputElement>
}

export default function Form(props: FormProps) {
  return <FormStyled {...props.formProps}>{props.children}</FormStyled>
}

function Input(props: InputProps) {
  return <InputStyled {...props.inputProps} />
}

function Label(props: PropsWithChildren) {
  return <label>{props.children}</label>
}

const FormStyled = styled.form`
  width: 100%;
`

const InputStyled = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
`

Form.Input = Input
Form.Label = Label
