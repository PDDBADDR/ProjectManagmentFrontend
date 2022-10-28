import {
  FormHTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
  TextareaHTMLAttributes,
} from 'react'
import styled from 'styled-components'
import { contrast } from '../../utils/styling'

interface FormProps extends PropsWithChildren {
  formProps: FormHTMLAttributes<HTMLFormElement>
}

interface InputProps {
  inputProps: InputHTMLAttributes<HTMLInputElement>
}

interface TextAreaProps {
  textAreaProps: TextareaHTMLAttributes<HTMLTextAreaElement>
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

function TextArea(props: TextAreaProps) {
  return <TextAreaStyled {...props.textAreaProps} />
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const InputStyled = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
`

const TextAreaStyled = styled.textarea`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
`

Form.Input = Input
Form.Label = Label
Form.TextArea = TextArea
