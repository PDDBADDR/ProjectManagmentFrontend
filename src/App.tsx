import { useRoutes } from 'react-router-dom'
import AppContext from './context/AppContext'
import { routes } from './routes'

function App() {
  return <AppContext>{useRoutes(routes)}</AppContext>
}

export default App
