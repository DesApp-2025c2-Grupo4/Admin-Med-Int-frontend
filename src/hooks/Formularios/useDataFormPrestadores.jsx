import {obtenerDataFormPrestadores} from '../../services/formularios/obtenerDataFormPrestadores'
import { useState, useEffect } from "react"
export function useDataFormPrestadores(){
  const [loadingDataForm, setLoadingDataForm] = useState(false)
  const [datosParaFormulario, setDatosParaFormulario] = useState()
  const [errorDataForm,setErrorDataForm] = useState()
  useEffect(()=>{
    const obtenerDatos = async () =>{
      setLoadingDataForm(true)
      try {
        const data = await obtenerDataFormPrestadores()
        if(!data){
          alert('Error al obtener los datos del formulario')
          setErrorDataForm('No se pudo obtener los datos para el formulario')
        }
        else{
          setDatosParaFormulario(data)
        }
      } catch (error) {
        console.log(error)
        setErrorDataForm('Error al obtener datos del formulario')

      }finally{
        setLoadingDataForm(false)
      }
      
    }
    obtenerDatos()
  },[])

  return{
    errorDataForm,
    datosParaFormulario,
    loadingDataForm
  }
}