import './App.css'
import { ToastContainer } from 'react-toastify';
import { MainRoutes } from './routes/MainRoutes.jsx';
function App() {
  return (
    <>
      {/* Contenedor global de toasts */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        icon={false}
        theme="light"
      />
      <MainRoutes />
    </>
  )
}
export default App
