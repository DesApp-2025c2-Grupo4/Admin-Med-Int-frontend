import '../InputBase.css'
export function InputSelect({text, listaDeOpciones, handleChange, value, name}){
    return (
        <div className='input-container'>
            <label htmlFor={text}>{text}</label>
            <select name={name} id={text} value={value} onChange={handleChange}>
                {listaDeOpciones.map( (o,index ) => <option key={index} value={o.id || o}> {o.descripcion || o} </option>)}
            </select>
        </div>
    )
}