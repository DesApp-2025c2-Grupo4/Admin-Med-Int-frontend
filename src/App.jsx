import './App.css'
import { Header } from './components/Header/Header.jsx'
import { NavBarRoutes } from './routes/NavBarRoutes.jsx'
function App() {
  return (
    <>
      <Header />
      {/* Rutas Para el navBar */}
      <main>
        <NavBarRoutes />
      </main>
    </>
  )
}

export default App
