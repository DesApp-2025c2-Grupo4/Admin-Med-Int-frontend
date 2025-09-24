import './InputCheckbox.css'
export function InputCheckbox({ label, name, checked, onChange, disabled = false }){
    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="checkbox-input"
            />
            <span className="checkbox-label">{label}</span>
        </label>
  );
}