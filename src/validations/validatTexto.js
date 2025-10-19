export const validarTexto = (texto,nombre,minimo=3,maximo=20)=>{
  let error = ''
  const textoSinEspacios = texto.trim()
  //Valido que no sea vacio
  if(textoSinEspacios==='') return error = `Campo necesario`
  //Valido que tenga el minimo de caracteres
  if(textoSinEspacios.lentgh<3) return error = `${nombre} debe tener ${minimo} caracteres como minimo`
  //Valido que no sobrepase el maximo
  if(textoSinEspacios.lentgh>20) return error = `${nombre} debe tener ${maximo} caracteres como maximo`

  return error
}