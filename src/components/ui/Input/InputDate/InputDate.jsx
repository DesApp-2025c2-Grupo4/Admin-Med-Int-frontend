import '../InputBase.css'
import { Tooltip } from 'react-tooltip'
export function InputDate({text, name, value, handleChange,requerido=true}){
    return (
        <div className='input-container'>
            <label htmlFor={text}>
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
            <input type="date" value = {value} name={name} onChange={handleChange}/>
        </div>
    )
}
