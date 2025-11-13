import { TitlePrincipal } from '../../components/TitlePrincipal/TitlePrincipal'
import { SubTitlePrincipal } from '../../components/SubTitlePrincipal/SubTitlePrincipal'
import { SectionUno } from './Section-1/SectionUno'
import { SectionDos } from './Section-2/SectionDos'
import { SectionTres } from './Section-3/SectionTres'
import { useCambiarTitulo } from '../../hooks/useCambiarTitulo'
import { useGetAfiliadosRecientes } from '../../hooks/useGetAfiliadosRecientes'
import { useGetPrestadoresRecientes } from '../../hooks/useGetPrestadoresRecientes'
export function Dashboard(){
  //Cambiar titulo de la pagina
  useCambiarTitulo({title: 'Dashboard'})

  //Obtengo afiliados recientes
  const { loadingAfiliados, afiliadosRecientes } = useGetAfiliadosRecientes() 
  const { loadingPrestadores, prestadoresRecientes } = useGetPrestadoresRecientes()
  //Retorno
  return(
    <div className='div__main-principal'>
      {/* Header de mi pantalla */}
      <TitlePrincipal text='Dashboard'/>
      <SubTitlePrincipal text='Resumen del estado actual del sistema de medicina integral' />

      {/* Estadisticas numéricas */}
      <SectionUno 
        loadingAfiliados={loadingAfiliados} 
        countAfiliados={afiliadosRecientes?.length}
        loadingPrestadores={loadingPrestadores}
        countPrestadores={prestadoresRecientes?.length}
      />

      {/* Afiliados mas recientes */}
      <SectionDos loadingAfiliados={loadingAfiliados} afiliadosRecientes={afiliadosRecientes?.slice(0, 5)}/>

      {/* Prestadores mas recientes */}
      <SectionTres loadingPrestadores={loadingPrestadores} prestadoresRecientes={prestadoresRecientes?.slice(0, 5)}/>
    </div>
  )
}