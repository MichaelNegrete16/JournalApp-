import {Routes, Route, Navigate} from 'react-router-dom'

import LoginScreen from '../components/auth/LoginScreen'
import RegisterScreen from '../components/auth/RegisterScreen'


const AuthRouter = () => {
  return (
    <div>
        <h1>AuthRouter</h1>

        <Routes>
            <Route path='login' element={<LoginScreen/>}/>
            <Route path='register' element={<RegisterScreen/>}/>
            {/* Si ninguna ruta es valida caera aqui */}
            {/* <Route path="*" element={<Navigate replace to='login'/>} /> */}
        </Routes>

    </div>
  )
}

export default AuthRouter