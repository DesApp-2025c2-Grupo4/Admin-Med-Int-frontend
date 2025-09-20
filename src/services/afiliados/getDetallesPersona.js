import { listGrupos } from '../../Mock/listGrupos.js'

export function getDetalleDePersona(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      for (const grupo of listGrupos) {
        const integrante = grupo.integrantes.find(i => i.personaId === Number(id))
        if (integrante) {
          resolve({ ...integrante, idGrupo: grupo.idGrupo, nroGrupo: grupo.nroGrupo,planMedico:grupo.planMedico })
          return
        }
      }
      // Si no lo encontró
      resolve(null)
    }, 700)
  })
}
