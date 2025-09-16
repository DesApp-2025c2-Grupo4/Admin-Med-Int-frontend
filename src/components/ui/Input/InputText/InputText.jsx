import '../InputBase.css'
export function InputText({text}){
    return (
        <div className='input-container'>
            <label htmlFor={text}>{text}</label>
            <input type="text" name={text} />
        </div>
    )
}