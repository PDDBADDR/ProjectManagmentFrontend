/* eslint-disable @typescript-eslint/no-explicit-any */
const colorsList = [
  'primary',
  'secondary',
  'muted',
  'dark',
  'bgPrimary',
  'bgSecondary',
  'primaryFont',
] as const

type color = typeof colorsList[number]
type themeColors = {
  [T in typeof colorsList[number]]: string
}

type contrast = 'white' | 'black'

type theme = {
  contrast: contrast
} & themeColors

interface Member {
  email: string
  id: number
  username: string
  is_active: boolean
}

interface Task {
  name: string
  description: string
  index: number
  project_id: number
  status_id: number
  id: number
}

interface Reindex {
  id: number
  index: number
  [key: string]: any
}

type ReindexObject = 'TASK' | 'STATUS'

interface Status {
  name: string
  index: number
  project_id: number
  tasks: Task[]
  id: number
}

interface Project {
  name: string
  owner_id: number
  id: number
  tasks_count: number
  members_count: number
}

interface ProjectStatusState extends Status {
  droppableId: string
}
