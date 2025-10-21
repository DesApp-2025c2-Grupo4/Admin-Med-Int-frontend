import { useEffect, useState } from "react"
import { getGrupoFamiliar } from "../services/afiliados/getGrupoFamiliar"

export function useGetGrupoFamiliar(id) {
  const [loadingGrupos, setLoadingGrupos] = useState(true)
  const [grupoFamiliar, setGrupoFamiliar] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true // para evitar setState si el componente se desmonta

    const fetchGrupo = async () => {
      try {
        const data = await getGrupoFamiliar(id)
        if (!isMounted) return

        if (data) {
          setGrupoFamiliar(data)
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
          setLoadingGrupos(false)
        }
      }
    }

    fetchGrupo()

    return () => {
      isMounted = false
    }
  }, [id])

  return { error, loadingGrupos, grupoFamiliar,setGrupoFamiliar }
}