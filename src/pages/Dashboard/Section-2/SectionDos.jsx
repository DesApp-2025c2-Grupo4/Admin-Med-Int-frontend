import './SectionDos.css'

import { TitleSection } from '../../../components/TitleSections/TitleSection.jsx'
import { TableAfiliados } from './ui/Table/TableAfiliados.jsx'
import { headerTableAfiliados } from '../../../constants/Dashboard/headerTableAfiliados.js'
import { Loader } from '../../../components/Loader/Loader.jsx'
import { SubTitlePrincipal } from '../../../components/SubTitlePrincipal/SubTitlePrincipal.jsx'
export function SectionDos({loadingAfiliados,afiliadosRecientes}){
  //En caso de estar cargando
  if(loadingAfiliados){
    return(
      <section className="box-border">
        <TitleSection text='Afiliados Recientes' icon={true}/>
        <div className="centrar">
          <Loader />
        </div>
      </section>
    )
  }
  //En caso de que hubo un error
  if(!afiliadosRecientes){
    return(
      <section className="box-border">
        <TitleSection text='Afiliados Recientes' icon={true}/>
        <div className="centrar">
          <SubTitlePrincipal text={'Error al obtener Afiliados'}/>
        </div>
      </section>
    )

  }

  //En caso de que no hayan Afiliados
  if(afiliadosRecientes?.length === 0){
    return(
      <section className="box-border">
        <TitleSection text='Afiliados Recientes' icon={true}/>
        <div className="centrar">
          <SubTitlePrincipal text={'Todavía no hay Afiliados cargados'}/>
        </div>
      </section>
    )
  }

  //En caso de que salga todo bien
  return(
    <section className="box-border">
      <TitleSection text='Afiliados Recientes' icon={true}/>
      <TableAfiliados 
        loadingAfiliados={loadingAfiliados} 
        listHeader={headerTableAfiliados}
        data={afiliadosRecientes}
      />     
    </section>  
  )
}