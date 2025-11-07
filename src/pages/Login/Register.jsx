import { useCambiarTitulo } from '../../hooks/useCambiarTitulo'
import { useIniciarSesion } from '../../hooks/login/useIniciarSesion'
import { Link } from 'react-router' 
import { useState } from 'react'
import { InputText } from '../../components/ui/Input/InputText/InputText'
import './Register.css'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
//Exporto la aplicacion
export function Register(){
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token) return navigate('/dashboard')
  },[])
  useCambiarTitulo({title:'Iniciar Sesión'})
  const {error, loading, login} = useIniciarSesion()
  const [dataForm, setDataForm] = useState({
    user:'',
    password:'',
    passwordRepetida:''
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    const ultimoCaracter = value.length
    if(value[ultimoCaracter-1] === ' ') return
    setDataForm(prev => ({ ...prev, [name]: value }))
  }
  return (
    <main className='conteiner-main-login-register' style={{flexDirection:'row-reverse !Important'}}>
      <div className='conteiner-message-welcome-register'>
        <h2 className='title-message-welcome'>Bienvenidos a SAMI</h2>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap: '10px'}}>
          <p className='text-message-welcome'>¿Ya tenés cuenta?</p>
          <Link to={'/login'}>
            <button className='btn btn-custom'>Iniciá sesión</button>
          </Link>
        </div>

      </div>
      <div className='container-form-custom container-form-custom-register'>
        <form >
          <h3 className='title'>Registrarse</h3>
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
              <InputText 
                text={'Repite la contraseña'}
                name={'passwordRepetida'}
                value={dataForm.passwordRepetida}
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
                  'Registrarse'
                }
              </button>
            </div>
            <p className='message-error-servidor'>{error}</p>
          </div>
        </form>
      </div>
    </main>
  );
}