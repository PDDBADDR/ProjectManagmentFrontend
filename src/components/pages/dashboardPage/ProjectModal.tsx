import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
  useCreateProjectMutation,
  useCreateStatusMutation,
} from '../../../features/projects/projectsApi'
import { Button } from '../../UI/Buttons'
import Form from '../../UI/Form'
import Modal, { ModalProps } from '../../UI/Modal'

interface ProjectFormInput {
  name: string
}

interface ProjectModalProps extends ModalProps {
  onAdd: (project: Project) => void
}

export default function ProjectModal(props: ProjectModalProps) {
  const { register, handleSubmit } = useForm<ProjectFormInput>()
  const [createProject] = useCreateProjectMutation()

  const onSubmit: SubmitHandler<ProjectFormInput> = async (data) => {
    try {
      await createProject(data)
        .unwrap()
        .then((payload) => {
          props.onAdd(payload)
        })
      props.onClose()
      toast.success(`Project '${data.name}' created`)
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
        <Form.Label>Project name</Form.Label>
        <Form.Input inputProps={{ type: 'text', ...register('name') }} />
        <Button buttonType='filled' buttonProps={{ type: 'submit' }}>
          Create
        </Button>
      </Form>
    </Modal>
  )
}
