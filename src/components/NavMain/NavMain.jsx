import './NavMain.css'
import { NavLink } from 'react-router'
export function NavMain({listItems}){
    /* 
        listItems -> Recibe una lista con los elementos
        del nav a colocar con el siguiente formato
        listItems = [
            {
                name: 'Nombre de la etiqueta',
                path: 'URL donde direcciona'
            }
        ]
    */
    return(
        <nav className="nav-main__container">
            <ul className="nav-main__list-container">
                {
                    listItems?.map((item,index) => 
                        <NavLink className="nav-main__list-item-container" key={index}>{item.name}</NavLink>
                    )
                }
            </ul>
        </nav>
    )
}