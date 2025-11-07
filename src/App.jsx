import './App.css'
import { Header } from './components/Header/Header.jsx'
import { NavBarRoutes } from './routes/NavBarRoutes.jsx'
import { ToastContainer } from 'react-toastify';
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
      {/* Header de todas las pantallas */}
      <Header />

      {/* Main principal */}
      <main>
        {/* Rutas Para el navBar */}
        <NavBarRoutes />
      </main>
    </>
  )
}

export default App
