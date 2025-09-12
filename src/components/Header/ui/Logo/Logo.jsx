import logo from '@assets/imgs/logo.png'
import './Logo.css'
export function Logo(){
  return(
    <div className="header__logo-container">
      <img src={logo} alt="Logo de pagina" />
    </div>
  )
}