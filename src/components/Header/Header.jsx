import { Logo } from "./ui/Logo/Logo"
import { NavBar } from "./ui/NavBar/NavBar"
import './Header.css'
import { LogoutIcon } from '../../assets/icons/LogoutIcon'
import { logout } from '../../utils/logout'
export function Header(){
  return(
    <header className="header__container">
      <div className='header__container-nav-bar-logo'>
        <Logo />
        <NavBar />
      </div>

      <button className='btn-logout-container' onClick={logout}>
        <LogoutIcon />
        Cerrar Sesión
      </button>
    </header>
  )
}