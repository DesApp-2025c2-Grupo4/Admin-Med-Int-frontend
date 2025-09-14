import { useEffect, useState } from "react";
import { getPrestadoresRecientes } from "../services/dashboard/getPrestadoresRecientes";
export function useGetPrestadoresRecientes(){
  const [loadingPrestadores, setLoadingPrestadores] = useState(true)
  const [prestadoresRecientes, setPrestadoresRecientes] = useState(null)
  useEffect(()=>{
    const fetchPrestadoresRecientes = async ()=>{
      try {
        const data = await getPrestadoresRecientes()
        setPrestadoresRecientes(data)
      } catch (error) {
        console.error(error)
      } finally{
        setLoadingPrestadores(false)
      }
    }
    fetchPrestadoresRecientes()
  },[])

  return {
    loadingPrestadores, prestadoresRecientes
  }
}