import { useParams } from "react-router";
import { useGetGrupoFamiliar } from "../../../hooks/useGetGrupoFamiliar";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo";
import { TitleSection } from "../../../components/TitleSections/TitleSection";
import { CardModificarGrupo } from "./CardModificarGrupo";
import { Loader } from "../../../components/Loader/Loader";
import './ModificarGrupo.css'

export function ModificarGrupo() {
  //Obtengo el id
  const { id } = useParams();
  const { error, loadingGrupos, grupoFamiliar,setGrupoFamiliar } = useGetGrupoFamiliar(id);

  useCambiarTitulo({ title: "Modificar Grupo Familiar" });

  return (
    <>
      <div className="section_container_modificarGrupo box-border">
        <TitleSection text="Modificar Grupo Familiar"></TitleSection>
        <section className="section_cards_modificarGrupo">
          {loadingGrupos ? (
            <div className="conteiner_loader-modificar">
              <Loader />
            </div> //Muestra el Loader en caso de estar cargando
          ) : error ? ( //Muestra el error en caso de estar cargando
            <h2 className="message-error">{error}</h2>
          ) : (
            <CardModificarGrupo grupo={grupoFamiliar} setGrupoFamiliar={setGrupoFamiliar}/>
          )}
        </section>
      </div>
    </>
  );
}
