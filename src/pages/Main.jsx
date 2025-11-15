import { useEffect } from 'react'
import { Header } from '../components/Header/Header'
import { NavBarRoutes } from '../routes/NavBarRoutes'
import './Main.css'
import { useNavigate } from 'react-router'
export function Main(){
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token) return navigate('/login')
  },[])
  return(
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