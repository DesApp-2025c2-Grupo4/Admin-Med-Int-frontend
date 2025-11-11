import { TitleSection } from '../../../../../components/TitleSections/TitleSection'
import { SituacionCard} from '../../../../../components/ui/Cards/SituacionCard/SituacionCard'
import { SubTitleSection } from '../../../../../components/ui/SubTitleSection/SubTitleSection'
export function SectionSituaciones({situaciones}){
  console.log(situaciones)
  return(
    <>
      <div style={{margin:'-1rem -1rem -2rem -1rem', display:'flex', justifyContent:'center'}}>
        <TitleSection text={'Situaciones cargadas(NO EDITABLES)'} />
      </div>
      <div style={{display:'flex', gap:'1rem', flexWrap:'wrap'}}>
        {
          situaciones && 
          situaciones.length !== 0 ?
            situaciones.map(s => 
              <SituacionCard 
                key={s.situacionId} 
                situacion={s} 
                mostrarBtn={false} 
              />
            )
            :
            <div style={{width:'100%', padding:'2rem ',display:'flex', justifyContent:'center'}}>
              <SubTitleSection text={'No posee situaciones cargadas'} />

            </div>

        }
      </div>
        
    </>
  )
}