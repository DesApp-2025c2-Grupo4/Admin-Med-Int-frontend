import '../InputBase.css'
export function InputSelect({text, listaDeOpciones}){
    return (
        <div className='input-container'>
            <label htmlFor={text}>{text}</label>
            <select name={text} id={text}>
                {listaDeOpciones.map( o => <option value={o}> {o} </option>)}
            </select>
        </div>
    )
}