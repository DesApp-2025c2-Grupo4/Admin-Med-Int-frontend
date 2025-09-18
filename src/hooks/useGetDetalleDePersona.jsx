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

        if (data) {
          setPersona(data)
          console.log(data)
        } else {
          setError("Resultado no encontrado")
        }
      } catch (err) {
        if (isMounted) {
          console.error(err)
          setError(`Error al obtener los datos de la persona con id ${id}`)
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

  return { error, loadingPersona, persona }
}