import '../InputBase.css'
import { Tooltip } from 'react-tooltip'
export function InputText({text, name, value, handleChange, requerido = true,error}){
    return (
        <div className='input-container'>
            <label htmlFor={name}>
                {text}
                {
                    requerido && 
                    <>
                        <span 
                            data-tooltip-id={`tooltip-${value}8`}
                            data-tooltip-content='Campo Requerido'
                            className="label__input-requerido cursor-help text-blue-600 font-medium" 
                            >(*)</span>
                        <Tooltip 
                            id={`tooltip-${value}8`}
                            place="top"
                            style={{
                                whiteSpace: "pre-line",
                            }}
                        />
                    </>
                }
            </label>
            <input type="text" name={name} value={value} onChange={handleChange} className={error ? 'border-error':''}
            />
            {error && <span className='error-message-form'>{error}</span>}
       </div>
    )
}