import '../InputBase.css'
export function InputDate({text, name, value, handleChange}){
    return (
        <div className='input-container'>
            <label htmlFor={text}>{text}</label>
            <input type="date" value = {value} name={name} onChange={handleChange}/>
        </div>
    )
}