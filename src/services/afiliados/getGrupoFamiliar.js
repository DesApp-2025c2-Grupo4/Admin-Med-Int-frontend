import { listGrupos } from "../../Mock/listGrupos.js";

export function getGrupoFamiliar(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const g = listGrupos.find((g) => g.idGrupo === Number(id));
      if (g) {
        resolve({
          ...g,
          idGrupo: g.idGrupo,
          nroGrupo: g.nroGrupo,
          planMedico: g.planMedico,
        });
        return;
      }

      // Si no lo encontró
      resolve(null);
    }, 1000);
  });
}
