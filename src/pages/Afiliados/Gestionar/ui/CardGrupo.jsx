import { Link } from "react-router";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ModifierIcon } from "../icons/ModifierIcon";
import { UsersIcon } from "../icons/UsersIcon";
import "./CardGrupo.css";
import { headerTableGrupoFamiliar } from "../../../../constants/Afiliados/Gestionar/headerTableGrupoFamiliar";
import { TableIntegrantes } from "./TableIntegrantes";
import { useState } from "react";
import { useDeleteGroup } from "../../../../hooks/useDeleteGroup";
import { Loader } from "../../../../components/Loader/Loader";
import { ModalDeConfirmacion } from '../../../../components/ModalDeConfirmacion/ModalDeConfirmacion'
export function CardGrupo({
  credencial,
  nombre,
  apellido,
  fechaAlta,
  planMedico,
  integrantes,
  setAllGrupos,
  idGrupo
}) {
  // 
  const {loadingDelete, error, deleteGroup} = useDeleteGroup({setAllGrupos})

  // Funcion y estados para mostrar modal
  const [showModal, setShowModal] = useState(false)
  const handleClickDelete = (funcionEliminar)=>{
    setShowModal(!showModal)
    funcionEliminar()
  }
  // Funcion y estados para mostrar listado 
  const  [contraer, setContraer] = useState(false) 

  const modificarCard = () => {
    setContraer(!contraer);
  }


  // Retorno
  return (
    <>
      {/* Funcion para mostrar la modal al eliminar */}
      {
        showModal && 
        <ModalDeConfirmacion 
          text='¿Seguro que deseas eliminar el grupo?'
          funcionConfirmar={()=>handleClickDelete(()=>deleteGroup(idGrupo))}
          funcionCancelar={()=>setShowModal(!showModal)}  
        />
      }
      {/* Funcion de estado de eliminacion */}
      
      {

      }
      {/* Retorno de seccion de la card */}
      <section
        className={`card_container box-border`}
        style={{ paddingBottom: contraer ? "1rem" : "0" }}
      >
        {
          loadingDelete && 
          <div className="cotainer-loader-card">
            <Loader />  
          </div>
        }
        <div className="container_data">
          <h1 className="titleGrupo">
            Grupo Familiar {credencial} | {nombre} {apellido}
          </h1>
          <p className="descriptionGrupo">
            Plan: {planMedico} | Fecha Alta: {fechaAlta}
          </p>
        </div>
        <div className="container_icons">
          <Link onClick={()=>setShowModal(!showModal)}>
            <DeleteIcon></DeleteIcon>
          </Link>
          <div onClick={modificarCard} style={{ cursor: "pointer" }}>
            <UsersIcon />
          </div>
          <Link>
            <ModifierIcon></ModifierIcon>
          </Link>
        </div>
        <div
          className={`container_tableIntegrantes ${contraer ? "contraer" : ""}`}
        >
          <TableIntegrantes
            loadingGrupos={false}
            listHeader={headerTableGrupoFamiliar}
            data={[{ integrantes }]}
          ></TableIntegrantes>
        </div>
      </section>
    </>
  );
}
