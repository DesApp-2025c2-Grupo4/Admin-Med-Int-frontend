import { useEffect, useState } from "react";
import { getCountAfiliados } from "../services/dashboard/getCountAfiliados";

export function useGetCountAfiliados(){
  //Estados de mi fetch
  const [loadingAfiliados, setLoadingAfiliados] = useState(true)
  const [countAfiliados, setCountAfiliados] = useState(0)
  
  //LLamada al fetching de datos
  useEffect(()=>{
    const fetchCountAfiliados = async()=>{

      try {
        //En caso de que salga todo bien
        const data = await getCountAfiliados()
        setCountAfiliados(data)
      } catch (error) {
        //En caso de error
        console.log(error)
      } finally{
        setLoadingAfiliados(false)
      }
    }

    //Ejecuto la funcion
    fetchCountAfiliados()
  },[])

  // Retorno
  return {
    loadingAfiliados,
    countAfiliados
  }
}