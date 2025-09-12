import './btnHamburguesa.css'
export function BtnHamburguesa({setShowNavBar,showNavBar}){
  return(
    <div className={`btnHamburguesa__containes ${showNavBar ? 'close' : ''}`} onClick={() => setShowNavBar(prev => !prev)}>
      <div className="btnHamburguesa__line f1"></div>
      <div className="btnHamburguesa__line f2"></div>
      <div className="btnHamburguesa__line f3"></div>
    </div>
  )
}