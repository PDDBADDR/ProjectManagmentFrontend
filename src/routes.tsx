import { RouteObject } from 'react-router-dom'
import BasePage from './components/pages/BasePage'
import DashboardPage from './components/pages/dashboardPage/DashboardPage'
import IndexPage from './components/pages/IndexPage'
import LoginPage from './components/pages/LoginPage'
import LogoutPage from './components/pages/LogoutPage'
import Page404 from './components/pages/Page404'
import ProjectPage from './components/pages/projectPage/ProjectPage'

export type CustomRouteObject = {
  name: string
  children?: CustomRouteObject[]
} & RouteObject

export const routes: CustomRouteObject[] = [
  {
    name: 'base',
    path: '',
    element: <BasePage />,
    children: [
      {
        name: 'index',
        index: true,
        element: <IndexPage />,
      },
      {
        name: 'dashboard',
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        name: 'project',
        path: 'project',
        element: <ProjectPage />,
      },
      {
        name: 'login',
        path: 'login',
        element: <LoginPage />,
      },
      {
        name: 'logout',
        path: 'logout',
        element: <LogoutPage />,
      },
    ],
  },
  {
    name: '404',
    path: '404',
    element: <Page404 />,
  },
]

const findPath = (name: string, level: CustomRouteObject[]) => {
  let result = null
  level.forEach((value) => {
    if (value.name === name) {
      result = `/${value.path || ''}`
      return
    }
    if (value.children) {
      const nextLevelResult = findPath(name, value.children)
      if (nextLevelResult) {
        result = `${value.path ? '/' + value.path : ''}${nextLevelResult}`
        return
      }
    }
  })
  return result
}

export const resolve = (name: string) => {
  const result = findPath(name, routes)
  return result ? result : '/404'
}
