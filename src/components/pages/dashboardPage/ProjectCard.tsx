import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { contrast } from '../../../utils/styling'

interface ProjectCardProps extends PropsWithChildren {
  onClick?: () => void
}

export default function ProjectCard(props: ProjectCardProps) {
  // const clickHandle = () => {
  //   if (props.projectId) navigate(resolve('project'), { state: { projectId: props.projectId } })
  //   else {
  //   }
  // }
  return <ProjectCardStyled onClick={props.onClick}>{props.children}</ProjectCardStyled>
}

function Title(props: PropsWithChildren) {
  return <ProjectCardTitleStyled>{props.children}</ProjectCardTitleStyled>
}

function Body(props: PropsWithChildren) {
  return <ProjectCardBodyStyled>{props.children}</ProjectCardBodyStyled>
}

function Blank(props: PropsWithChildren) {
  return <ProjectCardBlankStyled>{props.children}</ProjectCardBlankStyled>
}

ProjectCard.Title = Title
ProjectCard.Body = Body
ProjectCard.Blank = Blank

const ProjectCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
  border: 1px solid ${(p) => contrast(0.2, p.theme.bgSecondary, p.theme.contrast)};
  border-radius: 5px;
  min-height: 100px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${(p) => contrast(0.3, p.theme.bgSecondary, p.theme.contrast)};
  }
`

const ProjectCardTitleStyled = styled.div`
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: bold;
`

const ProjectCardBodyStyled = styled.div`
  margin-top: auto;
  font-size: 0.8rem;
  letter-spacing: 0.8px;
`

const ProjectCardBlankStyled = styled.div`
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin: auto;
  font-size: 4rem;
`
