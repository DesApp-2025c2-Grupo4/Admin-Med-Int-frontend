import { InputText } from '../../../../../components/ui/Input/InputText/InputText'
import './InputNuevoDato.css'
import {AddButton} from '../../../../../components/ui/AddButton/AddButton'
import { useState } from 'react'
import { data } from 'react-router'
export function InputNuevoDato({
  nameDato, 
  funcionEnviarDato,
  funcionValidarDato,
  listaDatosAgregados,
  id
}){
  //Estados para manejar los datos
  const [dato, setDato] = useState(nameDato === 'direcciones' ?
    {
      calle:'',
      nro:''
    }:
    {[nameDato]:''}
  )
  //Estado para manejar errores
  const [error, setError] = useState(nameDato === 'direcciones' ?
    {
      calle:'',
      nro:''
    }:
    {[nameDato]:''}
  )
  //Funcion para actualizar el input
  const handleChange = (e)=>{
    setError(prev => (
      nameDato ==='direcciones' ? 
      {
      calle:'',
      nro:''
      }:
      {...prev,[nameDato]:''}
    ))
    const {name, value} = e.target
    setDato(prev => ({...prev, [name]:value})) 
  }
  //Funcion para enviar el dato
  const handleEnviarDato = ()=>{
    const datoARevisar = nameDato==='direcciones' ? dato : dato[nameDato] 
    const erroresAlEnviar = funcionValidarDato(datoARevisar,listaDatosAgregados)
    let hayErrores;
    if(nameDato === 'direcciones'){

      hayErrores = Object.values(erroresAlEnviar).some(value => value !== '' && value !== null)
    }else{
      hayErrores =erroresAlEnviar
    }
    if(hayErrores){
      setError(prev => (nameDato === 'direcciones' ? 
        erroresAlEnviar:
        {...prev,[nameDato]:erroresAlEnviar}))
      return
    }
    funcionEnviarDato(dato,id)
  }
  return(
    <>
      <article className='input-nuevo-dato__container'>
        <div className={`input-nuevo-dato__input-container ${error[nameDato]!=='' && (error.calle !=='' || error.nro!=='') ? 'borde-error':''}`}> 
          {
            nameDato === 'direcciones' ? 
            <>
              <InputText 
                requerido={true}
                text={'Calle'}
                name={'calle'}
                value={dato.calle}
                handleChange={handleChange}
              />
              <InputText 
                requerido={false}
                text={'Número'}
                name={'nro'}
                value={dato.nro}
                handleChange={handleChange}
              />        
            </> 
            :
            <>
              <InputText 
                requerido={false}
                name={nameDato}
                value={dato[nameDato]}
                handleChange={handleChange}
              />          
            </>
          }         
          <AddButton onClick={handleEnviarDato}/> 
        </div>  

        {/* Muestro el error */}
        {
          nameDato === 'direcciones'?
            (error.calle || error.nro) &&
            <span className='error-message-form'>{error.calle || error.nro}</span> :
            error[nameDato] && 
            <span className='error-message-form'>{error[nameDato]}</span> 
        }
      </article>    
    </>
  )
}