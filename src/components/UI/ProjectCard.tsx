import { darken } from 'polished'
import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { resolve } from '../../routes'

interface ProjectCardProps extends PropsWithChildren {
  projectId: number
}

export default function ProjectCard(props: ProjectCardProps) {
  const navigate = useNavigate()
  const clickHandle = () => {
    navigate(resolve('project'), { state: { projectId: props.projectId } })
  }
  return <ProjectCardStyled onClick={clickHandle}>{props.children}</ProjectCardStyled>
}

function Title(props: PropsWithChildren) {
  return <TitleStyled>{props.children}</TitleStyled>
}

ProjectCard.Title = Title

const ProjectCardStyled = styled.div`
  padding: 10px;
  margin: 10px;
  border: 1px solid ${(p) => darken(0.1, p.theme.bgSecondary)};
  border-radius: 5px;
  min-height: 100px;
  cursor: pointer;

  &:hover {
    border-color: ${(p) => darken(0.3, p.theme.bgSecondary)};
  }
`

const TitleStyled = styled.div`
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: bold;
`
