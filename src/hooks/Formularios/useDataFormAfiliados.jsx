import { useEffect, useState } from "react";
import { obtenerDataFormAfiliados } from "../../services/formularios/obtenerDataFormAfiliados";

export function useDataFormAfiliados(){
  const [loadingDataForm, setLoadingDataForm] = useState(false)
  const [datosParaFormulario, setDatosParaFormulario] = useState()
  const [errorDataForm,setErrorDataForm] = useState()
  useEffect(()=>{
    const obtenerDatos = async () =>{
      setLoadingDataForm(true)
      try {
        const data = await obtenerDataFormAfiliados()
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