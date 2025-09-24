import '../InputBase.css'
export function InputText({text, name, value, handleChange}){
    return (
        <div className='input-container'>
            <label htmlFor={name}>{text}</label>
            <input type="text" name={name} value={value} onChange={handleChange} />
        </div>
    )
}