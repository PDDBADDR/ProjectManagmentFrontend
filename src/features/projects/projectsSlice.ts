import { createSlice } from '@reduxjs/toolkit'
import { projectsApi } from './projectsApi'

interface Project {
  name: string
  owner_id: number
  id: number
}

interface ProjectsSlice {
  projects: Project[]
}

const initialProjectsSlice: ProjectsSlice = {
  projects: [],
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialProjectsSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(projectsApi.endpoints.getProjects.matchFulfilled, (state, { payload }) => {
      state.projects = payload
    })
  },
})

export default projectsSlice.reducer
