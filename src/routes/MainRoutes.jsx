import { Route, Routes } from "react-router";
import { Register } from '../pages/Login/Register';
import { Login } from '../pages/Login/Login';
import { Main } from '../pages/Main';
export function MainRoutes(){
  return(
    <Routes>
      <Route path='register' element={<Register />}/>
      <Route path='login' element={<Login />}/>
      <Route path='*' element={<Main />} />
    </Routes>
  )
}