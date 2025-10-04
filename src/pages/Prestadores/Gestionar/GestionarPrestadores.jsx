import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo";
import { TitleSection } from "../../../components/TitleSections/TitleSection";
export function GestionarPrestadores() {
  useCambiarTitulo({ title: "Gestión de Prestadores" });
  return (
    <>
      <section className="section_container box-border">
        <TitleSection text="Gestión de Prestadores"></TitleSection>
      </section>
    </>
  );
}
