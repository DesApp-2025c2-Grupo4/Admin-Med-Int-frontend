import { Link } from 'react-router'
import './CardData.css'
import { Loader } from '../../../../components/Loader/Loader'
export function CardData({title,Icon,number,description, link,name, loading}){
  return(
    <article className='card-data__container box-border'>
      <div className="card-data__aside">

        {/* Titulo de la card */}
        <h2 className='card-data__title'>{title}</h2>

        {/* Numero de la card */}
        {
          // En caso de estar cargando muestra el loader
          loading ? <Loader /> : <p className='card-data__number'>{number}</p>
        }

        {/* Descripcion de la card */}
        <p className="card-data__description">{description}</p>
      </div>

      {/* Icono de la derecha de la card */}
      <Link to={link} title={`Ir a ${name}`}>
        <Icon />
      </Link>
    </article>
  )
}