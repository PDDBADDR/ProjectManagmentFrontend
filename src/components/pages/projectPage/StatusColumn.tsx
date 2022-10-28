import {
  faCog,
  faEllipsisVertical,
  faGripVertical,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { InfoBarContext } from '../../../context/InfoBarContext'
import { contrast } from '../../../utils/styling'
import { Button } from '../../UI/Buttons'
import { TaskModalHandler } from './ProjectPage'
import TaskCard from './TaskCard'

interface StatusColumnProps extends Status {
  showTaskModal: (opts: TaskModalHandler) => void
  addTask: (task: Task) => void
  droppableId: string
}

const StatusColumn = (props: StatusColumnProps) => {
  const { setObject } = useContext(InfoBarContext)
  return (
    <Draggable draggableId={props.droppableId} index={props.index}>
      {(provided) => (
        <StatusColumnStyled ref={provided.innerRef} {...provided.draggableProps}>
          <StatusColumnTitleStyled>
            <div>
              <StatusColumnTitleGripStyled {...provided.dragHandleProps}>
                <FontAwesomeIcon icon={faGripVertical} />
              </StatusColumnTitleGripStyled>
              {props.name}
            </div>
            <div>
              <Button
                buttonType='icon'
                style={{ fontSize: 1.2 }}
                buttonProps={{
                  onClick: () => {
                    setObject({ id: props.id, type: 'STATUS', name: props.name })
                  },
                }}
              >
                <FontAwesomeIcon icon={faCog} />
              </Button>
              <Button
                buttonType='icon'
                style={{ fontSize: 1.2 }}
                buttonProps={{
                  onClick: () => {
                    props.showTaskModal({
                      projectId: props.project_id,
                      statusId: props.id,
                      onAdd: props.addTask,
                    })
                  },
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          </StatusColumnTitleStyled>
          <Droppable droppableId={props.droppableId}>
            {(provided) => (
              <StatusColumnBodyStyled ref={provided.innerRef} {...provided.droppableProps}>
                {props.tasks.map((task) => (
                  <TaskCard key={task.id} {...task} />
                ))}
                {provided.placeholder}
              </StatusColumnBodyStyled>
            )}
          </Droppable>
        </StatusColumnStyled>
      )}
    </Draggable>
  )
}

const StatusColumnStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-height: clamp(100px, 70vh, 780px);
  flex: 0 0 clamp(250px, 50vw, 400px);
  margin: 10px;
  border: 1px solid ${(p) => contrast(0.2, p.theme.bgSecondary, p.theme.contrast)};
  border-radius: 5px;
`

const StatusColumnTitleStyled = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${(p) => contrast(0.2, p.theme.bgSecondary, p.theme.contrast)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  div:nth-child(1) {
    display: flex;
    align-items: center;
  }

  div:nth-child(2) {
    white-space: nowrap;
  }
`

const StatusColumnTitleGripStyled = styled.span`
  padding-right: 10px;
`

const StatusColumnBodyStyled = styled.div`
  flex: 1 0 100%;
`

export default StatusColumn
