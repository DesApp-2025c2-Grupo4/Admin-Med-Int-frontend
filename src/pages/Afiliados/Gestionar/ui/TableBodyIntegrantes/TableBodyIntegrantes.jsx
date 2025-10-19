import { useState } from "react"
import { useEliminarIntegrante } from "../../../../../hooks/Afiliados/useEliminarIntegrante"
import { ModalDeConfirmacion } from "../../../../../components/ModalDeConfirmacion/ModalDeConfirmacion";
import { IconoEstado } from '../../../../../components/IconoEstado/IconoEstado'
import { Loader } from "../../../../../components/Loader/Loader";
import { BotonDetallesDeIntegrante } from "./ui/BotonDetallesDeIntegrante";
import { BotonEliminarIntegrante } from './ui/BotonEliminarIntegrante';
import { BotonModificarIntegrante} from './ui/BotonModificarIntegrante'
export function TableBodyIntegrantes({integrantesDelGrupo}){
  //Estado para saber qué usuario eliminar
  const [idIntegranteEliminar, setIdIntegranteEliminar] = useState(null)
  //Estado para actualizar lista de integrantes
  const [integrantes, setIntegrantes] = useState([...integrantesDelGrupo])
  //Estado para mostrar modal de confirmacion
  const [showModal, setShowModal] = useState(false)
  //Llamado a mi hoo
  const {loading, eliminarIntegrante} = useEliminarIntegrante({setIntegrantes})
  

  //funcion para Eliminar Integrante
  const handleEliminarIntegrante = ()=>{
    setShowModal(false)
    eliminarIntegrante(idIntegranteEliminar)
    //alguna instruccion
  }

  //Funcion al presionar el boton de eliminar
  const handleClickEliminar = (id) => {
    setIdIntegranteEliminar(id)
    setShowModal(true)
  }
  return(
    <>
        
        <tbody
          className={`tableGrupo__tbody-container`}
          style={{position: 'relative'}}
        >
          {
            showModal &&
            <tr>
              <td> 
                <ModalDeConfirmacion 
                  text={'¿Seguro que desea eliminar el integrante?'}
                  funcionConfirmar={handleEliminarIntegrante}
                  funcionCancelar={()=>setShowModal(false)}
                />
              </td>
            </tr>
          }

          {loading &&
            <tr style={{
              position: 'absolute',
              width:'100%',
              height: '100%',
              left: 0,
              right:0,
              top: 0,
              backgroundColor: '#08172b4f',
              display:'flex',
              justifyContent:'center',
              alignItems: 'center'
            }}>
              <td>
                <Loader />
              </td>
            </tr>
          }

          { 
            (
              integrantes?.map((i) => {
                return (
                  <tr className="tableGrupo__tbody-tr" key={i.personaId}>
                    <td className="tableGrupo__tbody-td-estado"><IconoEstado estado={i.esActivo}/></td>
                    <td className="tableGrupo__tbody-td">{i.credencial}</td>
                    <td className="tableGrupo__tbody-td">{`${i.nombre}, ${i.apellido}`}</td>
                    <td className="tableGrupo__tbody-td">{i.dni}</td>
                    <td className="tableGrupo__tbody-td">
                      {i.fechaNacimiento}
                    </td>
                    <td className="tableGrupo__tbody-td">
                      {i.parentesco ? i.parentesco : "Titular"}
                    </td>
                    {/* Botones de acciones*/}
                    <td id="icons" className="tableGrupo__tbody-td sinBorde">
                      <BotonDetallesDeIntegrante id={i.personaId}/>
                      <BotonEliminarIntegrante 
                        handleClick={handleClickEliminar} 
                        esTitular={i.esTitular}
                        id={i.personaId}
                        />
                      <BotonModificarIntegrante id={i.personaId} />

                    </td>
                  </tr>
                );
              })
            
            )
          }
        </tbody>    
    </>

  )
}
