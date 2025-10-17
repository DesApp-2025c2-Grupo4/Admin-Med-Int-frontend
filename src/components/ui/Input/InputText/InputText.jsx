import '../InputBase.css'
export function InputText({text, name, value, handleChange, error}){
    return (
        <div className={`input-container`}>
            <label htmlFor={name}>{text}</label>
            <input 
                type="text" 
                name={name} 
                value={value} 
                onChange={handleChange} 
                className={error ? 'border-error':''}
            />
            {error && <span className='error-message-form'>{error}</span>}
        </div>
    )
}