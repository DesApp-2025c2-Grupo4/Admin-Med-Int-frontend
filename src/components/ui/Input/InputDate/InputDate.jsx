import '../InputBase.css'
export function InputDate({text, name}){
    return (
        <div className='input-container'>
            <label htmlFor={text}>{text}</label>
            <input type="date" name={name} />
        </div>
    )
}