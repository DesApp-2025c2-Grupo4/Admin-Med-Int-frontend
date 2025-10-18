import './AddButton.css'
export function AddButton({onClick}){
    return (
        <button type="button" onClick={onClick} className="add-button" >
            +
        </button> 
    )
}
