import { CardInfoDireccion } from '../../ui/CardInfoDireccion/CardInfoDireccion'
import { SubTitleSection } from '../../../../../components/ui/SubTitleSection/SubTitleSection'
import { InputNuevoDato } from '../../ui/InputNuevoDato/InputNuevoDato'
import { TitleSection } from '../../../../../components/TitleSections/TitleSection'
import { useEliminarDireccion } from '../../../../../hooks/Afiliados/Direccion/useEliminarDireccion'
import { useAgregarDireccion } from '../../../../../hooks/Afiliados/Direccion/useAgregarDireccion'
import { LoaderConTexto } from '../../../../../components/LoaderConTexto/LoaderConTexto'
import { validarDireccion } from '../../../../../validations/validarDireccion'
import { useEditarDireccion } from '../../../../../hooks/Afiliados/Direccion/useEditarDireccion'
export function SectionDirecciones({direcciones, personaId, setPersona}){
  //Hooks
  const {loading, agregarDireccion}=useAgregarDireccion(setPersona)
  const {loadingEliminarDireccion, eliminarDireccion}=useEliminarDireccion(setPersona)
  const {loadingEditarDireccion, editarDireccion}=useEditarDireccion(setPersona)
  return(
    <>
      <div style={{margin:'-1rem -1rem -2rem -1rem', display:'flex', justifyContent:'center'}}>
        <TitleSection text={'Editar Direcciones'} />
      </div>
      {/* Seccion de agregar un nuevo mail */}
      <SubTitleSection text={'Nueva Dirección: '}/>
      <InputNuevoDato 
        nameDato={'direcciones'}
        listaDatosAgregados={direcciones}
        funcionValidarDato={validarDireccion}
        funcionEnviarDato={agregarDireccion}
        id={personaId}
        placeholder={{calle:'El goat', nro:'2025'}}
      />
      {/* Seccion de Direcciones agreagdos */}
      <SubTitleSection text={'Direcciones Agregados: '} />
      <section className='section-data-container__datos-agregados'>
        {
          direcciones && direcciones.map(d => 
          <CardInfoDireccion
          data={d} 
          key={d.direccionId} 
          name={'direcciones'}
          nameTabla={'direccion'}
          funcionActualizarDato={editarDireccion}
          funcionEliminarDato={eliminarDireccion}
          cantidadElementos={direcciones.length}
          />)
        }
      </section>
      {
        (loading || loadingEliminarDireccion ||loadingEditarDireccion) &&
        <div className="conteiner-loader-section-editar-integrante">
            <LoaderConTexto 
              text={
                loading ? //Agregando Direccion
                'Agregando Direccion...':
                loadingEliminarDireccion ? //Eliminando Direccion
                'Eliminando Direccion...':
                'Actualizando Direccion...' //Actualizar
              } 
            />
        </div>
      }
    </>
  )

}