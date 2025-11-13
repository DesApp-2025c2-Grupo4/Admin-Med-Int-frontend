import { CampoDeInformacion } from "../../../Afiliados/DetalleDePersona/TodosLosDetalles/ui/campoDeInformacion";
import { CampoInformacionLista } from "../../../Afiliados/DetalleDePersona/TodosLosDetalles/ui/CampoInformacionLista/CampoInforacionLista";

export function SectionProfesion({ prestador }) {
  return (
    <section className="section__info-container">
      <h3 className="section__info-title">Información profesional</h3>
      <div className="info-row">
        <CampoDeInformacion
          title={"Tipo de Prestador"}
          info={prestador.tipoPrestador}
        />
        {(prestador.tipoPrestador === "Independiente") && (
          <CampoDeInformacion
            title={"Lugar de trabajo"}
            info={prestador.centro?.nombre || "Sin centro"}
          />
        ) }
      </div>
      <div className="info-row">
        <CampoInformacionLista
          title={"Especialidad/es"}
          lista={prestador.especialidad}
          campo={"descripcion"}
        />
      </div>
    </section>
  );
}
