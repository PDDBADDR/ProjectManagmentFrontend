import { useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AppContext from './context/AppContext'
import { routes } from './routes'

function App() {
  return (
    <>
      <AppContext>{useRoutes(routes)}</AppContext>
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
