import './Table.css'
import { Loader } from '../../../../../components/Loader/Loader'
export function TableAfiliados({listHeader,data}){
  /*
    Descripcion: este componente renderiza la tabla de afiliados del dashboard, los estilos son reutilizables para las demas tablas colocando las mismas clases.
    Entrada: 
      -> listHeader: Lista de encabezados para la tabla. Tiene la siguiente estructura
        listHeader: ['encabezado1',...,'encabezadoN']
      -> data: lista de afiliados mas recientes. tiene la siguiente estructura
        data [
          {
            personaId: "0000009-01",
            situacionesTerapeuticas: [],
            direcciones: [{ direccionId: 9, calle: "Mitre", nro: 456 }],
            telefonos: [{ telefonoId: 9, nroTelefono: "1101234567" }],
            tipoDocumento: { tipoDocId: 1, descripcion: "DNI" },
            nombre: "Sofia",
            apellido: "Castro",
            esTitular: false,
            fechaNacimiento: "1999-06-14",
            mail: "sofia.castro@mail.com",
            fechaAlta: "2024-02-01",
            fechaBaja: null,
            parentesco: "Hija",
            dni: "48988777",
            planMedico: { planId: 1, descripcion: "Oro" },
          }
        ]
  */
  return(
    <table className="table__container">

      {/* Header de la tabla */}
      <thead className="table__thead-container">
        <tr className='table__thead-tr'>
          {
            listHeader?.map((head,index) => 
            <th 
              className={`table__thead-th ${index === listHeader.length - 1 ? 'sinBorde' : ''}`}
              key={index}
              >
              {head}
            </th>)
          }
        </tr>
      </thead>

      {/* Body de la tabla */}

      {/* Controlamos si esta cargando para centrar loader */}
      <tbody className={`table__tbody-container`}>
        {
              data?.map(d => {
                return(
                  <tr className='table__tbody-tr' key={d.personaId}>
                    <td className='table__tbody-td'>{d.credencial}</td>
                    <td className='table__tbody-td'>{`${d.nombre}, ${d.apellido}`}</td>
                    <td className='table__tbody-td'>{d.fechaAlta}</td>
                    <td className='table__tbody-td'>{d.mail}</td>
                    {/* <td className='table__tbody-td sinBorde '><span className='resaltar'>{d.planMedico.descripcion}</span></td> */}
                  </tr> 
                )
              })
        }
        
      </tbody>
    </table>
  )
}