import { useNavigate } from 'react-router'
import './Paginacion.css'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function Paginacion({nroPage,cantidadElementos,path}){
  
  const navigate = useNavigate()
  const handleClick = (siguientePagina)=>{
    navigate(path+siguientePagina)
    window.scrollTo(0,0)
  }
  return(
    <div className="paginacion-container">
      <ScrollToTop />
      <div className="btn-paginacion-container">
        <button 
          className='btn-paginacion'
          disabled={nroPage==1}
          onClick={()=>handleClick(`${(Number(nroPage)-1)}`)}
        >
          {'🡨'}
        </button>
      </div>
      <div className="numero-page">
        {nroPage}
      </div>
      <div className="btn-paginacion-container">
        <button 
          className='btn-paginacion'
          disabled={nroPage*10 >= cantidadElementos}
          onClick={()=>handleClick(`${Number(nroPage)+1}`)}
        >
          {'🡪'}
        </button>
      </div>
    </div>
  )
}