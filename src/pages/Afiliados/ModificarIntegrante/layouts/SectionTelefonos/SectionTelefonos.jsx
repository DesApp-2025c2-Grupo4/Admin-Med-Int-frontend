import { CardInfo } from '../../ui/CardInfo/CardInfo';
import { InputNuevoDato } from '../../ui/InputNuevoDato/InputNuevoDato';
import { SubTitleSection } from '../../../../../components/ui/SubTitleSection/SubTitleSection'
import { validarNumeroDeTelefono} from '../../../../../validations/validarNumeroDeTelefono'
import { useAgregarTelefono} from '../../../../../hooks/Afiliados/Telefono/useAgregarTelefono'
import { useEliminarTelefono } from '../../../../../hooks/Afiliados/Telefono/useEliminarTelefono';
import { useEditarTelefono } from '../../../../../hooks/Afiliados/Telefono/useEditarTelefono';
import { LoaderConTexto} from '../../../../../components/LoaderConTexto/LoaderConTexto'
import { TitleSection } from '../../../../../components/TitleSections/TitleSection'
export function SectionTelefono({telefonosLista,personaId,setPersona}){
  const telefonosValidar = {
    telefonos: telefonosLista?.map(t => t.nroTelefono)
  }
  const {loading, agregarTelefono}=useAgregarTelefono(setPersona)
  const {loadingEliminarTelefono, eliminarTelefono}=useEliminarTelefono(setPersona)
  const {loadingEditarTelefono, editarTelefono}=useEditarTelefono(setPersona)
  return(
    <>
      <div style={{margin:'-1rem -1rem -2rem -1rem', display:'flex', justifyContent:'center'}}>
        <TitleSection text={'Editar Telefonos'} />
      </div>
      {/*Parte del input */}
      <SubTitleSection text={'Nuevo Telefono:'}/>
      <InputNuevoDato 
        nameDato={'nroTelefono'}
        funcionValidarDato={validarNumeroDeTelefono}
        listaDatosAgregados={telefonosValidar}
        id={personaId}
        funcionEnviarDato={agregarTelefono}
      />
      
      {/* Parte de los telefonos agregados */}
      <SubTitleSection text={'Telefonos Agregados:'}/>
      <section className='section-data-container__datos-agregados'>
        {
          telefonosLista && telefonosLista.map(t => 
          <CardInfo
            data={t} 
            key={t.telefonoId} 
            name={'nroTelefono'}
            nameTabla={'telefono'}
            funcionEliminarDato={eliminarTelefono}
            funcionActualizarDato={editarTelefono}
            cantidadElementos={telefonosLista.length}
          />)
        }
      </section>
      
      {
        (loading || loadingEliminarTelefono ||loadingEditarTelefono) &&
        <div className="conteiner-loader-section-editar-integrante">
            <LoaderConTexto 
              text={
                loading ? //Agregando telefono
                'Agregando Telefono...':
                loadingEliminarTelefono ? //Eliminando telefono
                'Eliminando Telefono...':
                'Actualizando Telefono...' //Actualizar
              } 
            />
        </div>
      }

    </>
  )
}