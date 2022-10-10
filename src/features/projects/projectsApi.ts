import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store'

interface GetProjectDetailsRequest {
  projectId: number
}

interface CreateStatusRequest {
  projectId: number
  name: string
}

interface GetTasksRequest {
  projectId: number
  statusId: number
}

interface CreateTaskRequest extends GetTasksRequest {
  name: string
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_PROJECTS_API_BASE,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getProjects: builder.mutation<Project[], void>({
      query: () => {
        const request = { url: '/', method: 'GET' }
        return request
      },
    }),
    getProjectDetails: builder.mutation<Project, GetProjectDetailsRequest>({
      query: (credentials) => {
        const request = { url: `/${credentials.projectId}`, method: 'GET' }
        return request
      },
    }),
    getStatuses: builder.mutation<Status[], GetProjectDetailsRequest>({
      query: (credentials) => {
        const request = { url: `/${credentials.projectId}/status`, method: 'GET' }
        return request
      },
    }),
    createStatus: builder.mutation<Status, CreateStatusRequest>({
      query: (credentials) => {
        const data = {
          name: credentials.name,
        }
        const request = { url: `/${credentials.projectId}/status`, method: 'POST', body: data }
        return request
      },
    }),
    getTasks: builder.mutation<Task[], GetTasksRequest>({
      query: (credentials) => {
        const request = {
          url: `/${credentials.projectId}/status/${credentials.statusId}/task`,
          method: 'GET',
        }
        return request
      },
    }),
    createTask: builder.mutation<Task, CreateTaskRequest>({
      query: (credentials) => {
        const data = {
          name: credentials.name,
        }
        const request = {
          url: `/${credentials.projectId}/status/${credentials.statusId}/task`,
          method: 'POST',
          body: data,
        }
        return request
      },
    }),
  }),
})

export const {
  useGetProjectsMutation,
  useGetProjectDetailsMutation,
  useGetStatusesMutation,
  useCreateStatusMutation,
  useGetTasksMutation,
  useCreateTaskMutation,
} = projectsApi
