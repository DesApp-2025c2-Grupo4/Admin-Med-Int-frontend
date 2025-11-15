import { navBarItems } from '@constants/navBarItems.js'
import './NavBar.css'
import { BtnHamburguesa } from '../BtnHamburguesa/BtnHamburguesa'
import { useState } from 'react'
import { LogoutIcon } from '../../../../assets/icons/LogoutIcon'
import { NavLink } from 'react-router-dom';
import { logout } from '../../../../utils/logout'
//Componente de un ítem de de la lista
function Item({
    item,
    setShowNavBar
  }){
  return(
    <NavLink 
      className={
      ({ isActive }) =>
        `nav-bar__container-item${isActive ? ' active' : ''}`
      } 
      to={item.path}
      onClick={()=>setShowNavBar(false)}
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
      <div style={{display:'flex', gap:'1rem', flexDirection:'row-reverse', alignItems:'center'}}>
        <BtnHamburguesa setShowNavBar= {setShowNavBar} showNavBar = {showNavBar}/>
        <button className='btn-logout-contaner-nav-mobile' onClick={logout}>
          <LogoutIcon />
        </button>
      </div>
      <ul className={`nav-bar__contenainer-list ${showNavBar ? 'show' : 'hidden'}`}>
        {
          navBarItems.map((item,index)=>
          <Item key={index} item={item} setShowNavBar={setShowNavBar}/>
        )
        }
      </ul>
    </nav>
  )
}