import './TitleSection.css'
import { BarChart } from '../../assets/icons/DashboardIcons/BarChart'
export function TitleSection({text,icon=false}){
  return (
    <div className='title-section__container' id='title-section'>
      <h2 className="title-section__text">{text}</h2>
      {icon && <BarChart/> }
    </div>
  )

}