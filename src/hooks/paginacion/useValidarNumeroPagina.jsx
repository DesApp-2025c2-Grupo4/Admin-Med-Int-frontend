import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useValidarNumeroPagina(page, cantidadElementos, path) {
  const navigate = useNavigate()

  useEffect(() => {
    const totalPaginas = Math.ceil(cantidadElementos / 10)

    if (page < 1) {
      navigate(`${path}1`)
      return
    }
     if (!page) {
      navigate(`${path}1`)
      return
    }
    if(cantidadElementos===0)return
    if (page > totalPaginas) {
      navigate(`${path}${totalPaginas}`)
      return
    }
  }, [page, cantidadElementos, path, navigate])
}
