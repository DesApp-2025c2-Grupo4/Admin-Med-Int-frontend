import "./SaveButton.css";

export function SaveButton({ text = "Guardar cambios" }) {
  return (
    <button type="submit" className="save-button">
      {text}
    </button>
  );
}

