import { useRoutes } from 'react-router-dom'
import AppContext from './context/AppContext'
import { routes } from './Routes'

function App() {
  return <AppContext>{useRoutes(routes)}</AppContext>
}

export default App
