import React, { forwardRef } from 'react';

export const CalendarButton = forwardRef(({ value, onClick }, ref) => {
  return (
    <svg
      // Pasa el evento de clic y la referencia al SVG.
      onClick={onClick}
      ref={ref}
      width="39"
      height="38"
      viewBox="0 0 39 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 0.5H20C30.2173 0.5 38.5 8.78273 38.5 19C38.5 29.2173 30.2173 37.5 20 37.5H19C8.78273 37.5 0.5 29.2173 0.5 19C0.5 8.78273 8.78273 0.5 19 0.5Z"
        fill="#A4C7F4"
        stroke="#A4C7F4"
      />
      <path
        d="M23 8V12M15 8V12M10 16H28M12 10H26C27.1046 10 28 10.8954 28 12V26C28 27.1046 27.1046 28 26 28H12C10.8954 28 10 27.1046 10 26V12C10 10.8954 10.8954 10 12 10Z"
        stroke="#08315E"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default function DateSelector() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        // Oculta el input y muestra el calendario al hacer clic en el botón
        customInput={<CalendarButton />}
      />
    </div>
  );
}