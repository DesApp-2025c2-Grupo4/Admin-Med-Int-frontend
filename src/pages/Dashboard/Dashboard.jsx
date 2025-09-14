import { TitlePrincipal } from '../../components/TitlePrincipal/TitlePrincipal'
import { SubTitlePrincipal } from '../../components/SubTitlePrincipal/SubTitlePrincipal'
import { SectionUno } from './Section-1/SectionUno'
import { SectionDos } from './Section-2/SectionDos'
import { SectionTres } from './Section-3/SectionTres'

export function Dashboard(){
  return(
    <>
      {/* Header de mi pantalla */}
      <TitlePrincipal text='Dashboard'/>
      <SubTitlePrincipal text='Resumen del estado actual del sistema de medicina integral' />

      {/* Estadisticas numéricas */}
      <SectionUno />

      {/* Afiliados mas recientes */}
      <SectionDos />

      {/* Prestadores mas recientes */}
      <SectionTres />
    </>
  )
}