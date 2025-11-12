import { TitleSection } from "../../../components/TitleSections/TitleSection"
import { FormNuevoPrestador } from "./FormNuevoPrestador/FormNuevoPrestador.jsx"
import './NuevoPrestador.css'

export function NuevoPrestador(){
  return (
      <section className="section__nuevo-prestador-container box-border">
        <TitleSection text="Nuevo prestador" />
        <FormNuevoPrestador text="Datos del prestador"/>
      </section>
  )
}