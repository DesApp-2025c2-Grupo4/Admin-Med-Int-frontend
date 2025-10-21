import { TitleSection } from "../../../components/TitleSections/TitleSection";
import { TablePrestadores } from "./TablePrestadores";
import { headerTablePrestadores } from "../../../constants/Dashboard/headerTablePrestadores";
import { Loader } from "../../../components/Loader/Loader";
export function SectionTres({loadingPrestadores, prestadoresRecientes}){
  return(
    <section className="box-border">
      <TitleSection text='Prestadores mas recientes' icon={true}/>
      {
        loadingPrestadores ? 
        <div className="centrar">
          <Loader />
        </div> :
        <TablePrestadores 
          loadingPrestadores={loadingPrestadores} 
          listHeader={headerTablePrestadores}
          data={prestadoresRecientes}
        />
      }
      
    </section>
  )
}