import './SectionDos.css'

import { TitleSection } from '../../../components/TitleSections/TitleSection.jsx'
import { TableAfiliados } from './ui/Table/TableAfiliados.jsx'
import { headerTableAfiliados } from '../../../constants/Dashboard/headerTableAfiliados.js'
import { useGetAfiliadosRecientes } from '../../../hooks/useGetAfiliadosRecientes.jsx'
import { Loader } from '../../../components/Loader/Loader.jsx'
export function SectionDos(){
  const {loadingAfiliados,afiliadosRecientes} = useGetAfiliadosRecientes()
  return (
    <section className='section-dos__container box-border'>
      <TitleSection text='Afiliados Recientes' icon={true}/>
      {
        loadingAfiliados ? 
        <div className="centrar">
          <Loader /> 
        </div> :
        <TableAfiliados 
          listHeader={headerTableAfiliados}
          data={afiliadosRecientes}
        />
      }
      
    </section>
  )
}