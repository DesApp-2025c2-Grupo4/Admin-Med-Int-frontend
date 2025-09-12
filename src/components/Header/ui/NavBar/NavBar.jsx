import { navBarItems } from '@constants/navBarItems.js'
import './NavBar.css'
import { BtnHamburguesa } from '../BtnHamburguesa/BtnHamburguesa'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
//Componente de un ítem de de la lista
function Item({item}){
  return(
    <NavLink className={
      ({ isActive }) =>
        `nav-bar__container-item${isActive ? ' active' : ''}`
      } 
      to={item.path}
    >
      {<item.icon />} 
      <span className='nav-bar__item-text'>{item.name}</span>
    </NavLink>
  )
}

//Componente principal
export function NavBar(){
  //Estado para mostrar menu hamburguesa
  const [showNavBar,setShowNavBar] = useState(false)

  //Retorno el componente
  return(
    <nav className="header__nav-bar-container">
      <BtnHamburguesa setShowNavBar= {setShowNavBar} showNavBar = {showNavBar}/>
        <ul className={`nav-bar__contenainer-list ${showNavBar ? 'show' : 'hidden'}`}>
          {
            navBarItems.map((item,index)=>
            <Item key={index} item={item}/>
          )
          }
        </ul>
      </nav>
  )
}