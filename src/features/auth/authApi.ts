import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface LoginResponse {
  username: string
  access_token: string
}

interface LoginRequest {
  username: string
  password: string
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_AUTH_API_BASE }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => {
        const request = { url: 'login', method: 'POST', body: new FormData() }
        request.body.append('username', credentials.username)
        request.body.append('password', credentials.password)
        return request
      },
    }),
  }),
})

export const { useLoginMutation } = userApi
