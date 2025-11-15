import './Login.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { InputText } from '../../components/ui/Input/InputText/InputText';
import { useIniciarSesion } from '../../hooks/login/useIniciarSesion';
import { useCambiarTitulo } from '../../hooks/useCambiarTitulo';
import { useNavigate } from 'react-router';
//Exporto la aplicacion

export function Login(){
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token) return navigate('/dashboard')
  },[])
  useCambiarTitulo({title:'Iniciar Sesión'})
  const {error, loading, login} = useIniciarSesion()
  const [dataForm, setDataForm] = useState({
    user:'',
    password:''
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    const ultimoCaracter = value.length
    if(value[ultimoCaracter-1] === ' ') return
    setDataForm(prev => ({ ...prev, [name]: value }))
  }
  return (
    <main className='conteiner-main-login'>
      <div className='conteiner-message-welcome conteiner-message-welcome-login'>
        <h2 className='title-message-welcome'>Bienvenidos a SAMI</h2>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap: '10px'}}>
          <p className='text-message-welcome'>Creá tu cuenta</p>
          <Link to={'/register'}>
            <button className='btn btn-custom'>Registrarme</button>
          </Link>
        </div>

      </div>
      <div className='container-form-custom container-form-custom-login '>
        <form >
          <h3 className='title'>Iniciar sesion</h3>
          <div style={{display:'flex', flexDirection:'column', gap: '1rem'}}>
            <div style={{display:'flex', flexDirection:'column', gap: '1rem'}}>
              <InputText 
                text={'Usuario'}
                name={'user'}
                value={dataForm.user}
                handleChange={handleChange}
                error={''}
              />
              <InputText 
                text={'Contraseña'}
                name={'password'}
                value={dataForm.password}
                handleChange={handleChange}
                error={''}
                type='password'
              />
            </div>

            <div >
              <button
                type='button'
                className='btn'
                onClick={() => login(dataForm)}
                disabled={loading}
              >
                {
                  loading ?
                  '...':
                  'Iniciar Sesion'
                }
              </button>
            </div>

            <div>
              <p style={
                {
                  textDecoration: 'underline',
                  cursor:'pointer', 
                  color:'#747474ff', 
                  fontSize:'calc(10px + 0.1vw)',
                  textAlign:'center'
                }
                }>
                ¿Olvidaste tu contraseña?
                </p>
            </div>
            <p className='message-error-servidor'>{error}</p>
          </div>
        </form>
      </div>
    </main>
  );
}