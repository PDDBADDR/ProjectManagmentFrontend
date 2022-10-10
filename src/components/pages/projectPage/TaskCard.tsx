import { darken } from 'polished'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

export default function TaskCard(props: Task) {
  return (
    <Draggable draggableId={`task-${props.id}`} index={props.index}>
      {(provided, snapshot) => (
        <TaskCardStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.name}
        </TaskCardStyled>
      )}
    </Draggable>
  )
}

const TaskCardStyled = styled.div`
  position: relative;
  padding: 10px;
  padding-left: 30px;
  margin-bottom: 5px;
  background-color: ${(p) => p.theme.bgSecondary};
  cursor: pointer;
  z-index: 99;

  &:before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    height: 100%;
    width: 20px;
    background-color: ${(p) => darken(0.2, p.theme.bgSecondary)};
    cursor: move;
  }
`
