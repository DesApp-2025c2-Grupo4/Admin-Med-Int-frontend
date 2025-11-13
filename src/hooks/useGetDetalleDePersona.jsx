import { useEffect, useState } from "react"
import { getDetalleDePersona } from "../services/afiliados/getDetallesPersona"

export function useGetDetallePersona(id) {
  const [loadingPersona, setLoadingPersona] = useState(true)
  const [persona, setPersona] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true // para evitar setState si el componente se desmonta

    const fetchPersona = async () => {
      try {
        const data = await getDetalleDePersona(id)
        if (!isMounted) return

        if (!data.error) {
          console.log(data)
          setPersona(data)
        } else {
          setError("Persona no encontrada.")
        }
      } catch (err) {
        if (isMounted) {
          
          console.error(err)
          setError(`Error al obtener los datos de la persona`)
        }
      } finally {
        if (isMounted) {
          setLoadingPersona(false)
        }
      }
    }

    fetchPersona()

    return () => {
      isMounted = false
    }
  }, [id])

  return { error, loadingPersona, persona,setPersona }
}