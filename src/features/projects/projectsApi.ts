import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store'
import { convertToSnake } from '../../utils/cases'

interface CreateProjectRequest {
  name: string
}

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
  description?: string
}

interface UpdateTaskRequest extends GetTasksRequest {
  taskId: number
  body: {
    name?: string
    statusId?: number
  }
}

interface DeleteProjectRequest {
  projectId: number
}

interface DeleteStatusRequest extends DeleteProjectRequest {
  statusId: number
}

interface DeleteTaskRequest extends DeleteStatusRequest {
  taskId: number
}

interface ReindexRequest {
  reindexObject: ReindexObject
  projectId: number
  statusId?: number
  body: Reindex[]
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
    createProject: builder.mutation<Project, CreateProjectRequest>({
      query: (credentials) => {
        const request = { url: '/', method: 'POST', body: credentials }
        return request
      },
    }),
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
          description: credentials.description,
        }
        const request = {
          url: `/${credentials.projectId}/status/${credentials.statusId}/task`,
          method: 'POST',
          body: data,
        }
        return request
      },
    }),
    updateTask: builder.mutation<void, UpdateTaskRequest>({
      query: (credentials) => {
        const request = {
          url: `/${credentials.projectId}/status/${credentials.statusId}/task/${credentials.taskId}`,
          method: 'PATCH',
          body: convertToSnake(credentials.body),
        }
        return request
      },
    }),
    deleteTask: builder.mutation<void, DeleteTaskRequest>({
      query: (credentials) => {
        const request = {
          url: `/${credentials.projectId}/status/${credentials.statusId}/task/${credentials.taskId}`,
          method: 'DELETE',
        }
        return request
      },
    }),
    reindex: builder.mutation<void, ReindexRequest>({
      query: (credentials) => {
        let url = `/${credentials.projectId}/status/`

        if (credentials.reindexObject === 'TASK') {
          if (credentials.statusId === undefined) throw 'Status id not provided'
          url += `${credentials.statusId}/task`
        }
        const request = {
          url: url,
          method: 'PUT',
          body: credentials.body,
        }
        return request
      },
    }),
  }),
})

export const {
  useCreateProjectMutation,
  useGetProjectsMutation,
  useGetProjectDetailsMutation,
  useGetStatusesMutation,
  useCreateStatusMutation,
  useGetTasksMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useReindexMutation,
  useUpdateTaskMutation,
} = projectsApi
