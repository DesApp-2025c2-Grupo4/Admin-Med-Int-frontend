import { InputText } from '../../../../../components/ui/Input/InputText/InputText'
import './InputNuevoDato.css'
import {AddButton} from '../../../../../components/ui/AddButton/AddButton'
import { useState } from 'react'
export function InputNuevoDato({
  nameDato, 
  funcionEnviarDato,
  funcionValidarDato,
  listaDatosAgregados,
  id,
  loader
}){
  //Estados para manejar los datos
  const [dato, setDato] = useState({
    [nameDato]:''
  })
  //Estado para manejar errores
  const [error, setError] = useState({
    [nameDato]:''
  })
  //Funcion para actualizar el input
  const handleChange = (e)=>{
    setError(prev => ({...prev,[nameDato]:''}))
    const {name, value} = e.target
    setDato(prev => ({...prev, [name]:value})) 
  }
  //Funcion para enviar el dato
  const handleEnviarDato = ()=>{
    const erroresAlEnviar = funcionValidarDato(dato[nameDato],listaDatosAgregados)
    console.log(erroresAlEnviar)
    if(erroresAlEnviar){
      setError(prev => ({...prev,[nameDato]:erroresAlEnviar}))
      return
    }
    console.log('Pasando')
    funcionEnviarDato(dato,id)
  }
  return(
    <>
      <article className='input-nuevo-dato__container'>
        <div className={`input-nuevo-dato__input-container ${error[nameDato]!=='' ? 'borde-error':''}`}>          
          <InputText 
            requerido={false}
            name={nameDato}
            value={dato[nameDato]}
            handleChange={handleChange}
          />
          <AddButton onClick={handleEnviarDato}/>
        </div>  

        {/* Muestro el error */}
        {
          error[nameDato] && 
          <span className='error-message-form'>{error[nameDato]}</span>
        }
      </article>    
    </>
  )
}