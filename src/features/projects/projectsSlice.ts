import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { projectsApi } from './projectsApi'

interface ProjectsSlice {
  projects: Project[]
}

const initialProjectsSlice: ProjectsSlice = {
  projects: [],
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialProjectsSlice,
  reducers: {
    addProject: (state, { payload }: PayloadAction<Project>) => {
      state.projects.push(payload)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(projectsApi.endpoints.getProjects.matchFulfilled, (state, { payload }) => {
      state.projects = payload
    })
  },
})

export const { addProject } = projectsSlice.actions
export default projectsSlice.reducer
