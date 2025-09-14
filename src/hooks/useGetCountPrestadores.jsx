import { useEffect, useState } from "react";
import { getCountPrestadores } from "../services/dashboard/getCountPrestadores";

export function useGetCountPrestadores(){
  //Estados de mi fetch
  const [loadingPrestadores, setLoadingPrestadores] = useState(true)
  const [countPrestadores, setCountPrestadores] = useState(0)
  
  //LLamada al fetching de datos
  useEffect(()=>{
    const fetchCountPrestadores = async()=>{

      try {
        //En caso de que salga todo bien
        const data = await getCountPrestadores()
        setCountPrestadores(data)
      } catch (error) {
        //En caso de error
        console.log(error)
      } finally{
        setLoadingPrestadores(false)
      }
    }

    //Ejecuto la funcion
    fetchCountPrestadores()
  },[])

  // Retorno
  return {
    loadingPrestadores,
    countPrestadores
  }
}