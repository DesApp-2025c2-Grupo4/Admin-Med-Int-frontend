import * as Yup from 'yup'
export const formularioCrearIntegrantesSchema = Yup.object().shape({
    nombre: 
        Yup.
        string("El nombre debe ser un texto").
        trim().
        required("El nombre es Obligatorio").
        min(5, 'Debe tener al menos 5 letras'),
    apellido:
        Yup.
        string().
        trim().
        required('El apellido es obligatorio').
        min(5,'Debe tener al menos 5 letas'),
    dni:
        Yup.
        string().
        trim().
        required('El DNI es obligatorio').
        min(8, 'No puede tener menos de 8 caracteres').
        max(8,'No puede tener mas de 8 caracteres').
        matches(/^[0-9]+$/, "Debe contener solo números"),
    fechaNacimiento:
        Yup.
        date().
        nullable().
        transform((value, originalValue) =>
            originalValue === "" ? null : value
        ).
        required('La Fecha de nacimiento es obligatoria').
        max(new Date(), 'No puedes ingresar fechas posterior al dia').
        min(new Date(1900,1,1)),
    emails: Yup.array()
    .of(
      Yup.string()
        .trim()
        .email("Debe ingresar un correo válido")
        .required("El email no puede estar vacío")
    )
    .min(1, "Debe ingresar al menos un email"),
})
