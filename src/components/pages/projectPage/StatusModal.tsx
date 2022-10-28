import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useCreateStatusMutation } from '../../../features/projects/projectsApi'
import { Button } from '../../UI/Buttons'
import Form from '../../UI/Form'
import Modal, { ModalProps } from '../../UI/Modal'

interface StatusFormInput {
  name: string
  projectId: number
}

interface StatusModalProps extends ModalProps {
  projectId?: number
  onAdd: (status: Status) => void
}

export default function StatusModal(props: StatusModalProps) {
  const { register, handleSubmit } = useForm<StatusFormInput>()
  const [createStatus] = useCreateStatusMutation()

  const onSubmit: SubmitHandler<StatusFormInput> = async (data) => {
    if (!props.projectId) return
    data.projectId = props.projectId
    try {
      await createStatus(data)
        .unwrap()
        .then((payload) => {
          props.onAdd(payload)
        })
      props.onClose()
      toast.success(`Status '${data.name}' added`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: { detail: string } | any) {
      const errorMsg =
        error.status === 'FETCH_ERROR' ? 'An unidentified error has occurred' : error.data.detail
      toast.error(errorMsg)
    }
  }

  return (
    <Modal {...props}>
      <Form formProps={{ onSubmit: handleSubmit(onSubmit) }}>
        <Form.Label>Status name</Form.Label>
        <Form.Input inputProps={{ type: 'text', ...register('name') }} />
        <Button buttonType='filled' buttonProps={{ type: 'submit' }}>
          Create
        </Button>
      </Form>
    </Modal>
  )
}
