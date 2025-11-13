import { useEffect, useState } from "react"
import { getAfiliadoRecientes } from "../services/dashboard/getAfiliadoRecientes"
export const useGetAfiliadosRecientes = ()=>{
  //Estados 
  const [loadingAfiliados,setloadingAfiliados] = useState(true)
  const [afiliadosRecientes, setAfiliadosRecientes] = useState(null)
  
  //Fetching
  useEffect(()=>{
    const fetchAfiliadosRecientes = async ()=>{
      try {
        const data = await getAfiliadoRecientes()
        setAfiliadosRecientes(data)
      } catch (error) {
        console.error(error)
      }finally{
        setloadingAfiliados(false)
      }
    }
    fetchAfiliadosRecientes()
  },[])

  //Retorno
  return(
    {
      loadingAfiliados,
      afiliadosRecientes
    }
  )
}