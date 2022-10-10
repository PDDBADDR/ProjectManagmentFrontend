import { darken } from 'polished'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { useGetTasksMutation } from '../../../features/projects/projectsApi'
import { compareTasksIndex, reorderTasks } from '../../../utils/tasks'
import { Button } from '../../UI/Buttons'
import { TaskModalHandler } from './ProjectPage'
import TaskCard from './TaskCard'

interface StatusColumnProps extends Status {
  showTaskModal: (opts: TaskModalHandler) => void
  droppableId: string
}

export interface StatusColumnRef {
  reorderTasks: (sourceIndex: number, destinationIndex: number) => void
  removeTask: (index: number) => Task
  addTaskAtIndex: (task: Task, index: number) => void
  droppableId: string
}

const StatusColumn = forwardRef((props: StatusColumnProps, ref) => {
  const [getTasks] = useGetTasksMutation()
  const [tasks, setTasks] = useState<Task[]>([])

  useImperativeHandle(
    ref,
    (): StatusColumnRef => ({
      reorderTasks: (sourceIndex: number, destinationIndex: number) => {
        const ordered = reorderTasks(tasks, sourceIndex, destinationIndex)
        setTasks(ordered)
      },
      removeTask: (index: number): Task => {
        const sourceClone = Array.from(tasks)
        const [removed] = sourceClone.splice(index, 1)
        const ordered = sourceClone.map((value, index) => ({ ...value, index: index }))
        setTasks(ordered)
        return removed
      },
      addTaskAtIndex: (task: Task, index: number) => {
        const sourceClone = Array.from(tasks)
        sourceClone.splice(index, 0, task)
        const ordered = sourceClone.map((value, index) => ({ ...value, index: index }))
        setTasks(ordered)
      },
      droppableId: props.droppableId,
    }),
  )

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
  }

  const fetchTasks = async () => {
    try {
      await getTasks({ projectId: props.project_id, statusId: props.id })
        .unwrap()
        .then((payload) => {
          const sorted = Array.from(payload)
          sorted.sort(compareTasksIndex)
          setTasks(payload)
        })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: { detail: string } | any) {
      const errorMsg =
        error.status === 'FETCH_ERROR' ? 'An unidentified error has occurred' : error.data.detail
      toast.error(errorMsg)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <Droppable droppableId={props.droppableId}>
      {(provided) => (
        <StatusColumnStyled ref={provided.innerRef} {...provided.droppableProps}>
          <StatusColumnTitleStyled>
            {props.name}
            <Button
              buttonType='link'
              buttonProps={{
                onClick: () => {
                  props.showTaskModal({
                    projectId: props.project_id,
                    statusId: props.id,
                    onAdd: addTask,
                  })
                },
              }}
            >
              &#43; Add task
            </Button>
          </StatusColumnTitleStyled>
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
          {provided.placeholder}
        </StatusColumnStyled>
      )}
    </Droppable>
  )
})

const StatusColumnStyled = styled.div`
  width: clamp(220px, 50vw, 400px);
  height: clamp(100px, 70vh, 800px);
  flex: 0 0 clamp(220px, 50vw, 400px);
  margin: 10px;
  border: 1px solid ${(p) => darken(0.1, p.theme.bgSecondary)};
  border-radius: 5px;
`

const StatusColumnTitleStyled = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${(p) => darken(0.1, p.theme.bgSecondary)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export default StatusColumn
