import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userApi } from '../features/auth/authApi'
import userReducer from '../features/auth/authSlice'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { projectsApi } from '../features/projects/projectsApi'
import projectsReducer from '../features/projects/projectsSlice'

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['userApi'],
}

const combinedReducer = combineReducers({
  [projectsApi.reducerPath]: projectsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  user: userReducer,
  projects: projectsReducer,
})

const persistedReducer = persistReducer(persistConfig, combinedReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userApi.middleware, projectsApi.middleware),
})

setupListeners(store.dispatch)
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
