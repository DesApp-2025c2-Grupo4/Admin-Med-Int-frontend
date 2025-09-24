import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarButton } from '../../CalendarButton/CalendarButton.jsx';
import '../InputBase.css'; 

export function InputCalendar({ text }) {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className='input-container'>
      <label htmlFor={text}>{text}</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        customInput={<CalendarButton />}
        placeholderText={text}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}