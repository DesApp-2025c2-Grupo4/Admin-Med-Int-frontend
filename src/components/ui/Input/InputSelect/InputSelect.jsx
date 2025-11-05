import '../InputBase.css'
import { Tooltip } from 'react-tooltip'

export function InputSelect({
  text,
  listaDeOpciones,
  handleChange,
  value,
  name,
  requerido = true,
  disabled = false,
  defaultText = "Selecciona una opción"
}) {
  return (
    <div className="input-container">
      <label htmlFor={text}>
        {text}
        {requerido && (
          <>
            <span
              data-tooltip-id={`tooltip-${value || name}`}
              data-tooltip-content="Campo Requerido"
              className="label__input-requerido cursor-help text-blue-600 font-medium"
            >
              (*)
            </span>
            <Tooltip
              id={`tooltip-${value || name}`}
              place="top"
              style={{ whiteSpace: "pre-line" }}
            />
          </>
        )}
      </label>

      <select
        name={name}
        id={text}
        value={value || ""}
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="">{defaultText}</option>

        {listaDeOpciones.map((o, index) => (
          <option
            key={index}
            value={o.id || o.idDia || o.value || ""}
          >
            {o.descripcion || o.label || o.texto || o.toString()}
          </option>
        ))}
      </select>
    </div>
  )
}

// import '../InputBase.css'
// import { Tooltip } from 'react-tooltip'
// export function InputSelect({text, listaDeOpciones, handleChange, value, name, requerido = true}){
//     return (
//         <div className='input-container'>
//             <label htmlFor={text}>
//                 {text}
//                 {
//                     requerido && 
//                     <>
//                         <span 
//                             data-tooltip-id={`tooltip-${value}8`}
//                             data-tooltip-content='Campo Requerido'
//                             className="label__input-requerido cursor-help text-blue-600 font-medium" 
//                             >(*)</span>
//                         <Tooltip 
//                             id={`tooltip-${value}8`}
//                             place="top"
//                             style={{
//                                 whiteSpace: "pre-line",
//                             }}
//                         />
//                     </>
//                 }
//             </label>
//             <select name={name} id={text} value={value || ""} onChange={handleChange}>
//                 {listaDeOpciones.map( (o,index ) => <option key={index} value={o.id || o}> {o.descripcion || o} </option>)}
//             </select>
//         </div>
//     )
// }