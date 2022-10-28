import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useCreateTaskMutation } from '../../../features/projects/projectsApi'
import { Button } from '../../UI/Buttons'
import Form from '../../UI/Form'
import Modal, { ModalProps } from '../../UI/Modal'

interface TaskFormInput {
  name: string
  description: string
  projectId: number
  statusId: number
}

interface TaskModalProps extends ModalProps {
  projectId?: number
  statusId?: number
  onAdd: (status: Task) => void
}

export default function TaskModal(props: TaskModalProps) {
  const { register, handleSubmit } = useForm<TaskFormInput>()
  const [createTask] = useCreateTaskMutation()

  const onSubmit: SubmitHandler<TaskFormInput> = async (data) => {
    if (!props.projectId || !props.statusId) return
    data.projectId = props.projectId
    data.statusId = props.statusId
    try {
      await createTask(data)
        .unwrap()
        .then((payload) => {
          props.onAdd(payload)
        })
      props.onClose()
      toast.success(`Task '${data.name}' added`)
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
        <Form.Label>Task name</Form.Label>
        <Form.Input inputProps={{ type: 'text', ...register('name') }} />
        <Form.Label>Task name</Form.Label>
        <Form.TextArea textAreaProps={{ ...register('description') }} />
        <Button buttonType='filled' buttonProps={{ type: 'submit' }}>
          Create
        </Button>
      </Form>
    </Modal>
  )
}
