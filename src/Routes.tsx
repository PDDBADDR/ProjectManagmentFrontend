import { RouteObject } from 'react-router-dom'
import BasePage from './components/base/BasePage'
import IndexPage from './components/base/IndexPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <BasePage />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
    ],
  },
]
