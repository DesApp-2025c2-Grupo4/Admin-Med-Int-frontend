import { IconoCopiar } from '../IconoCopiar/IconoCopiar'
import './CampoInformacionLista.css'
import { CardSituacion } from './CardSituacion/CardSituacion'
export function CampoInformacionLista({lista,title,campo}){
    return(
    <div className="info__container infor__container-lista">
      <h2 className='info__title'>{title}</h2>
      {
        campo === 'situaciones' ?
        lista?.map(
          (ele,i)=>
            <div key={i}className='infor__container-item-lista'>
              <CardSituacion situacion={ele}/>
            </div>
        ) 
        :
        lista?.map(
          (ele, i)=>{
            return(<div 
                        key={i}
                        className='infor__container-item-lista'>
                        <p className='info__text'>{
                          campo === 'direcciones' ?
                          `${ele.calle} - ${ele.nro ? ele.nro : 'S/N'}` :
                          ele[campo]}
                        </p>
                        <IconoCopiar />
            </div>)
          }
        )
      }
    </div>
  )
}