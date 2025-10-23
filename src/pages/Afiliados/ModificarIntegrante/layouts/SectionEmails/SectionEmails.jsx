import { CardInfo } from '../../ui/CardInfo/CardInfo'
import { SubTitleSection } from '../../../../../components/ui/SubTitleSection/SubTitleSection'
import { validarEmail } from '../../../../../validations/validarEmail'
import { InputNuevoDato } from '../../ui/InputNuevoDato/InputNuevoDato'
import { TitleSection } from '../../../../../components/TitleSections/TitleSection'
import { useEditarEmail } from '../../../../../hooks/Afiliados/Email/useEditarEmail'
import { useEliminarEmail } from '../../../../../hooks/Afiliados/Email/useEliminarEmail'
import { useAgregarEmail } from '../../../../../hooks/Afiliados/Email/useAgregarEmail'
import { LoaderConTexto } from '../../../../../components/LoaderConTexto/LoaderConTexto'
export function SectionEmails({emails, personaId, setPersona}){
  //Listado para validar que no agregue el mismo
  const listadoEmailValidar = emails?.map(m => m.descripcion)
  //Hooks
  const {loading, agregarEmail}=useAgregarEmail(setPersona)
  const {loadingEliminarEmail, eliminarEmail}=useEliminarEmail(setPersona)
  const {loadingEditarEmail, editarEmail}=useEditarEmail(setPersona)
  return(
    <>
      <div style={{margin:'-1rem -1rem -2rem -1rem', display:'flex', justifyContent:'center'}}>
        <TitleSection text={'Editar Emails'} />
      </div>
      {/* Seccion de agregar un nuevo mail */}
      <SubTitleSection text={'Nuevo Email: '}/>
      <InputNuevoDato 
        nameDato={'descripcion'}
        listaDatosAgregados={listadoEmailValidar}
        funcionValidarDato={validarEmail}
        funcionEnviarDato={agregarEmail}
        id={personaId}
      />
      {/* Seccion de emails agreagdos */}
      <SubTitleSection text={'Emails Agregados: '} />
      <section className='section-data-container__datos-agregados'>
        {
          emails && emails.map(e => 
          <CardInfo 
          data={e} 
          key={e.telefonoId} 
          name={'descripcion'}
          nameTabla={'email'}
          funcionActualizarDato={editarEmail}
          funcionEliminarDato={eliminarEmail}
          />)
        }
      </section>
      {
        (loading || loadingEliminarEmail ||loadingEditarEmail) &&
        <div className="conteiner-loader-section-editar-integrante">
            <LoaderConTexto 
              text={
                loading ? //Agregando Email
                'Agregando Email...':
                loadingEliminarEmail ? //Eliminando Email
                'Eliminando Email...':
                'Actualizando Email...' //Actualizar
              } 
            />
        </div>
      }
    </>
  )

}