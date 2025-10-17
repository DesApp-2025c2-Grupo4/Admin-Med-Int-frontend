import '../InputBase.css'
export function InputDate({text, name, value, handleChange,error}){
    return (
        <div className='input-container'>
            <label htmlFor={text}>{text}</label>
            <input 
                type="date" 
                value = {value} 
                name={name} 
                onChange={handleChange}
                className={error ? 'border-error':''}
            />
            {error && <span className='error-message-form'>{error}</span>}
        </div>
    )
}