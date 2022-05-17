import {Routes, Route} from 'react-router-dom'

import LoginScreen from '../components/auth/LoginScreen'
import RegisterScreen from '../components/auth/RegisterScreen'


const AuthRouter = () => {
  return (
    <div className='auth__main'>

      <div className='auth__box-container'>

        <Routes>
            <Route path='login' element={<LoginScreen/>}/>
            <Route path='register' element={<RegisterScreen/>}/>
            {/* Si ninguna ruta es valida caera aqui */}
            {/* <Route path="*" element={<Navigate replace to='login'/>} /> */}
        </Routes>

      </div>

    </div>
  )
}

export default AuthRouter