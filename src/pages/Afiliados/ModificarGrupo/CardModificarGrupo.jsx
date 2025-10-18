import { Link } from "react-router";
import { DeleteIcon } from "../../../assets/icons/Afiliados/DeleteIcon";
import { InputSelect } from "../../../components/ui/Input/InputSelect/InputSelect";
import { InputPlanMedico } from "../../../constants/Inputs/InputPlanMedico";
import { InputDate } from "../../../components/ui/Input/InputDate/InputDate";
import { useState } from "react";
import { AddMember } from "../../../components/ui/AddMember/AddMember";
import { RegisterGroup } from "../../../components/ui/RegisterGroup/RegisterGroup";
import "./CardModificarGrupo.css";

export function CardModificarGrupo({ grupo }) {
  const [dataForm, setDataForm] = useState({
    planMedico: 1,
    fechaAlta: '',
    fechaBaja: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="card_container_modificarGrupo box-border">
      <div className="container_data_modificarGrupo">
        <div>
          <h1 className="titleGrupo">
            Grupo Familiar {grupo.credencial} |{" "}
            {grupo.integrantes.find((i) => i.esTitular)?.nombre}{" "}
            {grupo.integrantes.find((i) => i.esTitular)?.apellido}
          </h1>
          <p className="descriptionGrupo">
            Plan: {grupo.planMedico.descripcion} | Fecha Alta: {grupo.fechaAlta}
          </p>
        </div>
        <div className="container_icons_cardModificarGrupo">
          <Link>
            <DeleteIcon></DeleteIcon>
          </Link>
        </div>
      </div>

      <div className="container_form_modificarGrupo">
        <InputSelect
          text="Plan médico"
          name="planMedico"
          listaDeOpciones={InputPlanMedico}
          value={dataForm.planMedico}
          handleChange={handleChange}
        />
        <InputDate
          text="Fecha de Registro"
          name="fechaAlta"
          value={dataForm.fechaAlta}
          handleChange={handleChange}
        />
      </div>
      <div className="container_botones_modificarGrupo">
        <AddMember />
        <RegisterGroup text={'Guardar Cambios'}/>
      </div>
    </section>
  );
}

