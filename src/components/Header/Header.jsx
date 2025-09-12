import { Logo } from "./ui/Logo/Logo"
import { NavBar } from "./ui/NavBar/NavBar"
import './Header.css'
export function Header(){
  return(
    <header className="header__container">
      <Logo />
      <NavBar />
    </header>
  )
}