import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

// Actions importaos
import {startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
// Hooks de formulario
import { useForm } from '../../hooks/useForm'


const LoginScreen = () => {

  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.ui)

  // Utilizar el custom Hook para Formularios
  const [formValues, handleInputChange] = useForm({
    email:'correo@correo.com',
    password: '1234567'
  })

  const {email,password} = formValues

  const handleLogin = e => {
      e.preventDefault()
      dispatch(startLoginEmailPassword(email,password))
  }

  const handleGoogleLogin =() => {
    dispatch(startGoogleLogin())
  }

  return (
    <>
      <h3 className='auth__title'>Login</h3>

      <form onSubmit={handleLogin}>

          <input value={email} onChange={handleInputChange}
                 className='auth__input' type="text" placeholder='Email' name='email' autoComplete='off'/>
          <input value={password} onChange={handleInputChange}
                className='auth__input' type="password" placeholder='Password' name='password' />
          <button className='btn btn-primary' type='submit' disabled={loading} >Login</button>

          <div className='auth__social-networks'>
              <p>Login with social networks</p>
              <div className='google-btn' onClick={handleGoogleLogin}>
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