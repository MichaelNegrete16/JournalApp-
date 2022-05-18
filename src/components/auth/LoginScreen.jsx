import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'

// Actions importaos
import { login } from '../../actions/auth'
// Hooks de formulario
import { useForm } from '../../hooks/useForm'


const LoginScreen = () => {

  const dispatch = useDispatch()

  // Utilizar el custom Hook para Formularios
  const [formValues, handleInputChange] = useForm({
    email:'correo@correo.com',
    password: 123456
  })

  const {email,password} = formValues

  const handleLogin = e => {
      e.preventDefault()
      dispatch(login(123,'Michael'))
  }

  return (
    <>
      <h3 className='auth__title'>Login</h3>

      <form onSubmit={handleLogin}>

          <input value={email} onChange={handleInputChange}
                 className='auth__input' type="text" placeholder='Email' name='email' autoComplete='off'/>
          <input value={password} onChange={handleInputChange}
                className='auth__input' type="password" placeholder='Password' name='password' />
          <button className='btn btn-primary' type='submit' >Login</button>

          <div className='auth__social-networks'>
              <p>Login with social networks</p>
              <div className='google-btn'>
                <div className='google-icon-wrapper'>
                    <img className='google-icon' src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                </div>
                <p className='btn-text'>
                    <b>Sign in with google</b>
                </p>
              </div>
          </div>

          <Link className='link' to="/auth/register"> Create new account </Link>

      </form>
    </> 
  )
}

export default LoginScreen