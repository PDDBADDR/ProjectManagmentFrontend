import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useGetProjectsMutation } from '../../../features/projects/projectsApi'
import { addProject } from '../../../features/projects/projectsSlice'
import { resolve } from '../../../routes'
import { Col, Row } from '../../UI/Flexbox'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

export default function DashboardPage() {
  const user = useAppSelector((state) => state.user)
  const projects = useAppSelector((state) => state.projects)
  const navigate = useNavigate()
  const [getProjects] = useGetProjectsMutation()
  const [showProjectModal, setShowProjectModal] = useState(false)
  const dispatch = useAppDispatch()

  const fetchProjects = async () => {
    try {
      await getProjects().unwrap()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: { detail: string } | any) {
      const errorMsg =
        error.status === 'FETCH_ERROR' ? 'An unidentified error has occurred' : error.data.detail
      toast.error(errorMsg)
    }
  }

  useEffect(() => {
    if (!user.username) navigate(resolve('login'))
  }, [user])

  useEffect(() => {
    fetchProjects() // TODO: Optimalize it!
  }, [])
  return (
    <>
      <h2>Your projects</h2>
      <Row>
        {projects.projects.map((project) => (
          <Col mobileL={50} laptop={25} key={project.id}>
            <ProjectCard
              onClick={() => {
                navigate(resolve('project'), { state: { projectId: project.id } })
              }}
            >
              <ProjectCard.Title>{project.name}</ProjectCard.Title>
              <ProjectCard.Body>
                <p>Tasks: {project.tasks_count}</p>
                <p>Members: {project.members_count}</p>
              </ProjectCard.Body>
            </ProjectCard>
          </Col>
        ))}
        <Col mobileL={50} laptop={25}>
          <ProjectCard
            onClick={() => {
              setShowProjectModal(true)
            }}
          >
            <ProjectCard.Blank>+</ProjectCard.Blank>
          </ProjectCard>
        </Col>
      </Row>
      <ProjectModal
        title={'Create project'}
        onAdd={(project: Project) => {
          dispatch(addProject(project))
        }}
        show={showProjectModal}
        onClose={() => {
          setShowProjectModal(false)
        }}
      />
    </>
  )
}
