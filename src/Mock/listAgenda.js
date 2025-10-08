export const listAgenda = [
  {
    agendaId: 1,
    prestadorId: 1,
    diaDeSemana: [{ idDia: 1, descripcion: "Lunes" }],
    horario: [
      {
        idHorario: 1,
        idDia: 1,
        horarioInicio: "12:30",
        horarioFinal: "15:00",
        duracionTurno: "150",
      },
    ],
  },
  {
    agendaId: 2,
    prestadorId: 2,
    diaDeSemana: [{ idDia: 2, descripcion: "Martes" }],
    horario: [
      {
        idHorario: 2,
        idDia: 2,
        horarioInicio: "09:00",
        horarioFinal: "12:00",
        duracionTurno: "180",
      },
    ],
  },
  {
    agendaId: 3,
    prestadorId: 3,
    diaDeSemana: [{ idDia: 3, descripcion: "Miércoles" }],
    horario: [
      {
        idHorario: 3,
        idDia: 3,
        horarioInicio: "08:00",
        horarioFinal: "11:30",
        duracionTurno: "210",
      },
    ],
  },
  {
    agendaId: 4,
    prestadorId: 1,
    diaDeSemana: [{ idDia: 4, descripcion: "Jueves" }],
    horario: [
      {
        idHorario: 4,
        idDia: 4,
        horarioInicio: "10:00",
        horarioFinal: "13:00",
        duracionTurno: "180",
      },
    ],
  },
  {
    agendaId: 5,
    prestadorId: 4,
    diaDeSemana: [{ idDia: 5, descripcion: "Viernes" }],
    horario: [
      {
        idHorario: 5,
        idDia: 5,
        horarioInicio: "14:00",
        horarioFinal: "17:30",
        duracionTurno: "210",
      },
    ],
  },
  {
    agendaId: 6,
    prestadorId: 5,
    diaDeSemana: [
      { idDia: 6, descripcion: "Sábado" },
      { idDia: 7, descripcion: "Domingo" },
    ],
    horario: [
      {
        idHorario: 6,
        idDia: 6,
        horarioInicio: "09:00",
        horarioFinal: "12:00",
        duracionTurno: "180",
      },
      {
        idHorario: 7,
        idDia: 7,
        horarioInicio: "10:00",
        horarioFinal: "13:00",
        duracionTurno: "180",
      },
    ],
  },
  {
    agendaId: 7,
    prestadorId: 10,
    diaDeSemana: [
      { idDia: 6, descripcion: "Sábado" },
      { idDia: 7, descripcion: "Domingo" },
    ],
    horario: [
      {
        idHorario: 8,
        idDia: 6,
        horarioInicio: "09:00",
        horarioFinal: "12:00",
        duracionTurno: "180",
      },
      {
        idHorario: 9,
        idDia: 7,
        horarioInicio: "10:00",
        horarioFinal: "13:00",
        duracionTurno: "180",
      },
    ],
  },
];
