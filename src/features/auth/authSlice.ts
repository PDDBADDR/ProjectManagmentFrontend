import { createSlice } from '@reduxjs/toolkit'
import { userApi } from './authApi'

interface UserSlice {
  token?: string
  username?: string
  permissions?: string[]
}

const initialUserSlice: UserSlice = {
  token: undefined,
  username: undefined,
  permissions: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserSlice,
  reducers: {
    logout: (state) => {
      state.username = undefined
      state.token = undefined
      state.permissions = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.username = payload.username
      state.token = payload.access_token
    })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
