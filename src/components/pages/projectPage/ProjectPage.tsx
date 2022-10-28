import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  useDeleteTaskMutation,
  useGetProjectDetailsMutation,
  useGetStatusesMutation,
  useReindexMutation,
  useUpdateTaskMutation,
} from '../../../features/projects/projectsApi'
import { Button } from '../../UI/Buttons'
import StatusColumn from './StatusColumn'
import StatusModal from './StatusModal'
import TaskModal from './TaskModal'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { moveTask, reorderItem, UpdateStatusState } from '../../../utils/tasks'
import InfoBar from './InfoBar'
import { InfoBarContextProvider } from '../../../context/InfoBarContext'

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

export default function ProjectPage() {
  const { state } = useLocation()
  const [getProjectDetails] = useGetProjectDetailsMutation()
  const [getStatuses] = useGetStatusesMutation()
  const [reindex] = useReindexMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [statuses, setStatuses] = useState<ProjectStatusState[]>([])
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [taskModalHandler, setTaskModalHandler] = useState<TaskModalState | undefined>()

  const addStatus = (status: Status) => {
    if (!project) return
    setStatuses((prev) => [
      ...prev,
      {
        ...status,
        droppableId: `col-${status.id}`,
      },
    ])
  }

  const addTask = (task: Task) => {
    if (!project) return
    const statusIndex = statuses.findIndex((x) => x.id === task.status_id)
    const tasks = [...statuses[statusIndex].tasks, task]
    const newStatuses = UpdateStatusState(statuses, statusIndex, tasks)
    setStatuses(newStatuses)
  }

  const removeTask = (id: number) => {
    if (!project) return
    const statusIndex = statuses.findIndex((x) => x.tasks.find((y) => y.id === id))
    if (statusIndex === -1) return
    const task = statuses[statusIndex].tasks.find((x) => x.id === id)
    if (!task) return
    const tasks = statuses[statusIndex].tasks.filter((x) => x.id !== id)
    requestDeleteTask(task).then(() => {
      const ordered = reorderItem(tasks) as Task[]
      console.log(task.status_id)

      requestReindex('TASK', ordered, task.status_id).then(() => {
        const newStatuses = UpdateStatusState(statuses, statusIndex, ordered)
        setStatuses(newStatuses)
      })
    })
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
      if (result.type === 'STATUSES') {
        const ordered = reorderItem(
          statuses,
          source.index,
          destination.index,
        ) as ProjectStatusState[]
        setStatuses(ordered)
        requestReindex('STATUS', ordered)
      } else {
        const statusIndex = statuses.findIndex(
          (status) => status.droppableId === destination.droppableId,
        )
        if (statusIndex === -1) return
        const ordered = reorderItem(
          statuses[statusIndex].tasks,
          source.index,
          destination.index,
        ) as Task[]
        setStatuses((prev) => {
          return UpdateStatusState(prev, statusIndex, ordered)
        })
        requestReindex('TASK', ordered, statuses[statusIndex].id)
      }
    } else {
      if (result.type === 'STATUSES') return

      const sourceStatusIndex = statuses.findIndex(
        (status) => status.droppableId === source.droppableId,
      )
      const destinationStatusIndex = statuses.findIndex(
        (status) => status.droppableId === destination.droppableId,
      )
      if (sourceStatusIndex === -1 || destinationStatusIndex === -1) return
      const { task, sourceList, destList } = moveTask(
        statuses[sourceStatusIndex].tasks,
        statuses[destinationStatusIndex].tasks,
        source.index,
        destination.index,
        statuses[destinationStatusIndex].id,
      )
      let updatedState = UpdateStatusState(statuses, sourceStatusIndex, sourceList)
      updatedState = UpdateStatusState(updatedState, destinationStatusIndex, destList)
      setStatuses(updatedState)
      requestReindex('TASK', sourceList, statuses[sourceStatusIndex].id).then(() => {
        requestMoveTask(task, statuses[sourceStatusIndex].id).then(() => {
          requestReindex('TASK', destList, statuses[destinationStatusIndex].id)
        })
      })
    }
  }

  const requestReindex = async (obj: ReindexObject, elements: Reindex[], statusId?: number) => {
    if (!project) return
    const body = elements.map((element) => ({ id: element.id, index: element.index }))
    console.log(statusId)
    try {
      await reindex({
        reindexObject: obj,
        projectId: project.id,
        statusId: statusId,
        body: body,
      }).unwrap()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: { detail: string } | any) {
      console.log(error)

      const errorMsg =
        error.status === 'FETCH_ERROR' ? 'An unidentified error has occurred' : error.data.detail
      toast.error(errorMsg)
    }
  }

  const requestMoveTask = async (task: Task, oldStatusId: number) => {
    if (!project) return
    try {
      await updateTask({
        projectId: project.id,
        statusId: oldStatusId,
        taskId: task.id,
        body: { statusId: task.status_id },
      }).unwrap()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: { detail: string } | any) {
      const errorMsg =
        error.status === 'FETCH_ERROR' ? 'An unidentified error has occurred' : error.data.detail
      toast.error(errorMsg)
    }
  }

  const requestDeleteTask = async (task: Task) => {
    if (!project) return
    try {
      await deleteTask({
        projectId: project.id,
        statusId: task.status_id,
        taskId: task.id,
      }).unwrap()

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
        })
      await getStatuses({ projectId: (state as ProjectLocationState)?.projectId })
        .unwrap()
        .then((payload) => {
          const statuses = payload.map((value) => ({
            ...value,
            droppableId: `col-${value.id}`,
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
  useEffect(() => {
    fetchProject()
  }, [])

  return (
    <div>
      {project?.name}
      <hr />

      <InfoBarContextProvider>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'statuses'} type={'STATUSES'} direction={'horizontal'}>
            {(provided) => (
              <StatusesWrapperStyled ref={provided.innerRef}>
                {statuses.map((status) => (
                  <StatusColumn
                    key={status.id}
                    {...status}
                    droppableId={status.droppableId}
                    showTaskModal={showTaskModal}
                    addTask={addTask}
                  />
                ))}
                {provided.placeholder}
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
            )}
          </Droppable>
        </DragDropContext>
        <InfoBar onRemoveTask={removeTask} onRemoveStatus={removeTask} />
      </InfoBarContextProvider>

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
