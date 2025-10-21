// Iconos
import { UserIcon } from '../../../assets/icons/DashboardIcons/UsersIcon.jsx'
import { StethoscopeIcon } from '../../../assets/icons/DashboardIcons/StethoscopeIcon.jsx'

//Tarjeta
import { CardData } from '../ui/CardData/CardData.jsx'

//Estilos
import './SectionUno.css'

export function SectionUno({loadingAfiliados,countAfiliados, loadingPrestadores,countPrestadores}){

  //Retorno
  return(
    <section className="dashboard__section-1">
      <CardData 
        title='Total afiliados' 
        Icon={UserIcon} 
        number={countAfiliados} 
        loading={loadingAfiliados}
        description={'Grupos familiares activos'}
        name='Afiliados'
        link='/afiliados/gestionar'
        />
      <CardData 
        title='Total Prestadores' 
        Icon={StethoscopeIcon} 
        number={countPrestadores} 
        loading={loadingPrestadores}
        description={'Médicos y centros activos'}
        name='Prestadores'
        link='/prestadores/gestionar'
        />
    </section>
  )
}