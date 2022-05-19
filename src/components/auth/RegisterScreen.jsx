import {Link} from 'react-router-dom'
import { useForm } from '../../hooks/useForm'

// Libreria para validar el email del formulario rapidamente
import validator from 'validator'

// llamados del dispatch par mostrar en redux
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterEmailPasswoordName } from '../../actions/auth'


const RegisterScreen = () => {

    // Declaracion del dispatch para hacer los llamados del action
    const dispatch = useDispatch()
    // El useselector va a disparar un callBack en el cual esta el state
    const {msgError} = useSelector(state => state.ui)
    

    // Los valores del formulario estan pre-definidos para ahorrar tiempo
    const [formValues,handleInputChange] = useForm({
        name:'Michael',
        email:'correo@correo.com',
        password: 123456,
        password2: 123456
    })

    const {name,email,password,password2} = formValues

    const handleRegister = e => {
      e.preventDefault()

      if(isFormValid()){
          dispatch(startRegisterEmailPasswoordName(email,password,name))
      }

    }

    const isFormValid = () => {

      if(name.trim().length === 0){
        dispatch(setError('El nombre es requerido'))
        return false
      }else if (!validator.isEmail(email)){
        dispatch(setError('Email no valido'))
        return false
      }else if (password !== password2 || password.length < 5){
        dispatch(setError('Password debe tener mas de 5 caracteres y deben ser iguales'))
        return false
      }

      dispatch(removeError())
      return true
    }

    return (
      <>
        <h3 className='auth__title'>Register</h3>
        <form onSubmit={handleRegister}>

            {msgError && 
              <div className='auth__alert-error'>
                  {msgError}
              </div>
            }

            <input value={name} onChange={handleInputChange}
                   className='auth__input' type="text" placeholder='Name' name='name' autoComplete='off'/>
            <input value={email} onChange={handleInputChange}
                   className='auth__input' type="text" placeholder='Email' name='email' autoComplete='off'/>
            <input value={password} onChange={handleInputChange}
                   className='auth__input' type="password" placeholder='Password' name='password' />
            <input value={password2} onChange={handleInputChange}
                   className='auth__input' type="password" placeholder='Confirm password' name='password2' />
            <button className='btn btn-primary mb-5' type='submit' >Login</button>


            <Link className='link' to="/auth/login"> Already registered? </Link>

        </form>
      </>
    )
}

export default RegisterScreen