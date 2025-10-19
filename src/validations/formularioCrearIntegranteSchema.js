import * as Yup from 'yup';

// 🔹 Función para sumar meses a una fecha
function sumarMeses(fechaBase = new Date(), cantidadMeses = 1) {
  const nuevaFecha = new Date(fechaBase);
  nuevaFecha.setMonth(nuevaFecha.getMonth() + cantidadMeses);
  return nuevaFecha;
}

export const formularioCrearIntegrantesSchema = (grupo = null) =>
  Yup.object().shape({
    nombre: Yup.string("El nombre debe ser un texto")
      .trim()
      .required("El nombre es obligatorio")
      .min(5, 'Debe tener al menos 5 letras'),

    apellido: Yup.string()
      .trim()
      .required('El apellido es obligatorio')
      .min(5, 'Debe tener al menos 5 letras'),

    dni: Yup.string()
      .trim()
      .required('El DNI es obligatorio')
      .min(8, 'No puede tener menos de 8 caracteres')
      .max(8, 'No puede tener más de 8 caracteres')
      .matches(/^[0-9]+$/, "Debe contener solo números"),

    fechaNacimiento: Yup.date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .required('La fecha de nacimiento es obligatoria')
      .max(new Date(), 'No puedes ingresar una fecha posterior al día de hoy')
      .min(new Date(1900, 0, 1), 'La fecha debe ser posterior a 1900-01-01'),

    fechaAlta: Yup.date()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .required('La fecha de alta es obligatoria')
      .min(grupo?.fechaAlta || new Date(2020, 0, 1), "Ingrese una fecha posterior a 2020-01-01")
      .max(sumarMeses(new Date(), 2), `La fecha no puede ser posterior a ${sumarMeses(new Date(), 2).toLocaleDateString()}`),

    fechaBaja: Yup.date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .min(Yup.ref('fechaAlta'), 'La fecha de baja debe ser posterior a la fecha de alta')
      .test(
        'min-2-meses',
        'La fecha de baja debe ser al menos 1 mes después de la fecha de alta',
        function (value) {
          const fechaAlta = this.parent.fechaAlta;
          if (!fechaAlta || !value) return true;
          const fechaMinima = sumarMeses(new Date(fechaAlta), 1);
          return value >= fechaMinima;
        }
      ),

    telefonos: Yup.array()
      .min(1, 'Debe ingresar al menos un teléfono')
      .required('Debe ingresar al menos un teléfono'),

    emails: Yup.array()
      .min(1, 'Debe ingresar al menos un email')
      .required('Debe ingresar al menos un email'),

    direcciones: Yup.array()
      .min(1, 'Debe ingresar al menos una dirección')
      .required('Debe ingresar al menos una dirección'),

  });
