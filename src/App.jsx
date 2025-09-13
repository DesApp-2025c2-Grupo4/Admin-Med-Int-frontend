import './App.css'
import { Header } from './components/Header/Header.jsx'
import { NavBarRoutes } from './routes/NavBarRoutes.jsx'
function App() {
  return (
    <>
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
