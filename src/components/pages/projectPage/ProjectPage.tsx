import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  useGetProjectDetailsMutation,
  useGetStatusesMutation,
} from '../../../features/projects/projectsApi'
import { Button } from '../../UI/Buttons'
import StatusColumn, { StatusColumnRef } from './StatusColumn'
import StatusModal from './StatusModal'
import TaskModal from './TaskModal'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

interface ProjectLocationState {
  projectId: number
}

export interface TaskModalHandler {
  projectId: number
  statusId: number
  onAdd: (status: Task) => void
}

interface TaskModalState extends TaskModalHandler {
  show: boolean
}

interface StatusState {
  droppableId: string
  status: Status
  ref: any
}

export default function ProjectPage() {
  const { state } = useLocation()
  const [getProjectDetails] = useGetProjectDetailsMutation()
  const [getStatuses] = useGetStatusesMutation()
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [statuses, setStatuses] = useState<StatusState[]>([])
  const statusesRef = useRef<StatusColumnRef[]>([])
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [taskModalHandler, setTaskModalHandler] = useState<TaskModalState | undefined>()

  const addStatus = (status: Status) => {
    if (!project) return
    setStatuses((prev) => [
      ...prev,
      {
        droppableId: `col-${status.id}`,
        status: status,
        ref: (elem: never) => (statusesRef.current[prev.length] = elem),
      },
    ])
  }

  const showTaskModal = (opts: TaskModalHandler) => {
    setTaskModalHandler({ show: true, ...opts })
  }

  const closeTaskModal = () => {
    setTaskModalHandler((prev) => (prev ? { ...prev, show: false } : undefined))
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    if (source.droppableId === destination.droppableId) {
      const statusRef = statusesRef.current.find(
        (status) => status.droppableId === destination.droppableId,
      )
      if (!statusRef) return
      statusRef.reorderTasks(source.index, destination.index)
    } else {
      const sourceRef = statusesRef.current.find(
        (status) => status.droppableId === source.droppableId,
      )
      const destinationRef = statusesRef.current.find(
        (status) => status.droppableId === destination.droppableId,
      )
      if (!sourceRef || !destinationRef) return
      const task = sourceRef.removeTask(source.index)
      destinationRef.addTaskAtIndex(task, destination.index)
    }
  }

  const fetchStatuses = async () => {
    try {
      await getStatuses({ projectId: (state as ProjectLocationState)?.projectId })
        .unwrap()
        .then((payload) => {
          const statuses = payload.map((value, index) => ({
            droppableId: `col-${value.id}`,
            status: value,
            ref: (elem: never) => (statusesRef.current[index] = elem),
          }))
          setStatuses(statuses)
        })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: { detail: string } | any) {
      const errorMsg =
        error.status === 'FETCH_ERROR' ? 'An unidentified error has occurred' : error.data.detail
      toast.error(errorMsg)
    }
  }

  const fetchProject = async () => {
    try {
      await getProjectDetails({ projectId: (state as ProjectLocationState)?.projectId })
        .unwrap()
        .then((payload) => {
          setProject(payload)
          fetchStatuses()
        })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: { detail: string } | any) {
      const errorMsg =
        error.status === 'FETCH_ERROR' ? 'An unidentified error has occurred' : error.data.detail
      toast.error(errorMsg)
    }
  }
  useEffect(() => {
    fetchProject()
  }, [])
  return (
    <div>
      {project?.name}
      <hr />
      <StatusesWrapperStyled>
        <DragDropContext onDragEnd={onDragEnd}>
          {statuses.map((status) => (
            <StatusColumn
              key={status.status.id}
              {...status.status}
              droppableId={status.droppableId}
              showTaskModal={showTaskModal}
              ref={status.ref}
            />
          ))}
        </DragDropContext>
        <Button
          buttonType={'link'}
          style={{ fontSize: 4 }}
          buttonProps={{
            onClick: () => {
              setShowStatusModal(true)
            },
          }}
        >
          &#43;
        </Button>
      </StatusesWrapperStyled>
      <StatusModal
        title={'Create new status'}
        projectId={project?.id}
        show={showStatusModal}
        onAdd={addStatus}
        onClose={() => {
          setShowStatusModal(false)
        }}
      />
      {taskModalHandler && (
        <TaskModal title={'Create new task'} onClose={closeTaskModal} {...taskModalHandler} />
      )}
    </div>
  )
}

const StatusesWrapperStyled = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
`

// TODO: UNINSTALL DND KIT
