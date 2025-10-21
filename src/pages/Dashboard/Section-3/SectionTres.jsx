import { TitleSection } from "../../../components/TitleSections/TitleSection";
import { TablePrestadores } from "./TablePrestadores";
import { headerTablePrestadores } from "../../../constants/Dashboard/headerTablePrestadores";
import { Loader } from "../../../components/Loader/Loader";
import { SubTitlePrincipal } from "../../../components/SubTitlePrincipal/SubTitlePrincipal";
export function SectionTres({loadingPrestadores, prestadoresRecientes}){

  //En caso de estar cargando
  if(loadingPrestadores){
    return(
      <section className="box-border">
        <TitleSection text='Prestadores Recientes' icon={true}/>
        <div className="centrar">
          <Loader />
        </div>
      </section>
    )
  }
  //En caso de que hubo un error
  if(!prestadoresRecientes){
    return(
      <section className="box-border">
        <TitleSection text='Prestadores Recientes' icon={true}/>
        <div className="centrar">
          <SubTitlePrincipal text={'Error al obtener prestadores'}/>
        </div>
      </section>
    )

  }

  //En caso de que no hayan prestadores
  if(prestadoresRecientes?.length === 0){
    return(
      <section className="box-border">
        <TitleSection text='Prestadores Recientes' icon={true}/>
        <div className="centrar">
          <SubTitlePrincipal text={'Todavía no hay prestadores cargados'}/>
        </div>
      </section>
    )
  }

  //En caso de que salga todo bien
  return(
    <section className="box-border">
      <TitleSection text='Prestadores Recientes' icon={true}/>
      <TablePrestadores 
        loadingPrestadores={loadingPrestadores} 
        listHeader={headerTablePrestadores}
        data={prestadoresRecientes}
      />     
    </section>
  )
}