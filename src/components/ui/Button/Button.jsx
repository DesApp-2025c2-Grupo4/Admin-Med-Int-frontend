import "./Button.css"; 

export function Button({ text, onClick }) {
  return (
    <button 
      className="btn" 
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
