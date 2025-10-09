import { useState } from "react";
import { Flecha } from "../../../assets/icons/Flecha.jsx";
import "./ReporteContainer.css";

export function ReporteContainer({
    title,
    children,
    className=""
}) {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className={`box-border reporte-container ${className}`} onClick={handleVisible}>
      <div className="reporte-header">
        <h1 className="titulo-reporte ">{title}</h1>
        <Flecha className={visible ? "rotated" : ""} />
      </div>
      {visible &&  (
        <div className="inputs-container" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      )}
    </div>
  );
}
