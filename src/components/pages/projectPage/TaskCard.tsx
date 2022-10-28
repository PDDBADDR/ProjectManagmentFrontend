import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { InfoBarContext } from '../../../context/InfoBarContext'
import { contrast } from '../../../utils/styling'

interface TaskCardStyledProps {
  isDragging: boolean
}

export default function TaskCard(props: Task) {
  const { setObject } = useContext(InfoBarContext)
  return (
    <Draggable draggableId={`task-${props.id}`} index={props.index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <TaskCardStyled
            isDragging={snapshot.isDragging}
            onClick={() => {
              setObject({
                id: props.id,
                type: 'TASK',
                name: props.name,
                description: props.description,
              })
            }}
          >
            <TaskCardGripStyled {...provided.dragHandleProps}>
              <FontAwesomeIcon icon={faGripVertical} />
            </TaskCardGripStyled>
            {props.name}
          </TaskCardStyled>
        </div>
      )}
    </Draggable>
  )
}

const TaskCardStyled = styled.div<TaskCardStyledProps>`
  display: flex;
  padding: 10px;
  margin: 5px;
  background-color: ${(p) => p.theme.bgSecondary};
  cursor: pointer;
  z-index: 99;
  border: 1px solid
    ${(p) => contrast(0.2, p.isDragging ? p.theme.primary : p.theme.bgSecondary, p.theme.contrast)};
  transform: scale(${(p) => (p.isDragging ? 1.05 : 1)});
  transition: transform 0.1s ease-in-out;
  border-radius: 5px;
  overflow: hidden;
  user-select: none;
`

const TaskCardGripStyled = styled.span`
  padding-right: 10px;
  margin-top: auto;
  margin-bottom: auto;
`
