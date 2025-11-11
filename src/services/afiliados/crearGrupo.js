const URL_API = import.meta.env.VITE_URL_API;
export const crearGrupo = async (dataForm)=>{
  //------------  Primero creo el grupo
  
  //Creo mi body 
  const dataGrupo = crearObjetoGrupo(dataForm)

  //Peticion a la api
  const resGrupo = await fetch(`${URL_API}/grupo`,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(dataGrupo)
  })

  //En caso de error
  if(!resGrupo.ok) throw new Error(`Error en la solicitud: ${resGrupo}`);

  //Que salga todo bien
  const grupo = await resGrupo.json()
  //-------------------Creo al titular
  //Creo mi body para la peticion
  const dataTitular = crearObjetoPersona(dataForm, grupo.idGrupo)
  
  //Peticion
  const resTitular = await fetch(`${URL_API}/persona`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(dataTitular)
  })
  
  //En caso de error
  if(!resTitular.ok){
    //Agregan fetch para eliminar el grupo
    throw new Error('Error al crear el titular')
  }
  const titular = await resTitular.json()
  return {grupo,titular}
}

//Funciones auxiliares

function crearObjetoGrupo(data){
  

  return {
    planId : data.planId,
    fechaAlta: data.fechaAlta,
    fechaBaja:data.fechaBaja || null
  }
}

export function crearObjetoPersona(data,idGrupo){
  //Obtengo fecha actual
  const hoy = new Date();
  const fechaFormateada = hoy.toISOString().split('T')[0];

  //Formateo telefonos
  const telefonosFormateados = data.telefonos.map(t=>{
    return {
      nroTelefono:t
    }
  })

  //emails formateados
  const emailFormateados = data.emails.map(e=>{
    return {
      descripcion:e
    }
  })
  
  //Formateo situaciones terapeuticas
  const situacionesFormateadas = data.situacionesTerapeuticas.map(s => {
    delete s.descripcion
    return {
      ...s,
      fechaInicio: s.fechaInicio || fechaFormateada
    }
  })

  //Creo el objeto
  
  const integrante = {
    nombre: data.nombre,
    apellido: data.apellido,
    parentesco: data.parentesco ||'Titular',
    dni: data.dni,
    fechaNacimiento: data.fechaNacimiento,
    fechaAlta: data.fechaAlta,
    fechaBaja: data.fechaBaja || null,
    idGrupo: idGrupo,
    tipoDocId: data.tipoDocId,
    direcciones: data.direcciones,
    telefonos: telefonosFormateados,
    emails: emailFormateados,
    situacionesTerapeuticas: situacionesFormateadas
  };

  return integrante
}