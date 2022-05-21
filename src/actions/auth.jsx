import  {firebase, googleAuthProvider } from '../firebase/firebase-config'
import { types } from "../types/types"
import { finishLoading, startLoading } from './ui'

// Mensajes de errores entre otros
import Swal from 'sweetalert2'


// Acciones que vamos a hacer
export const login = (uid,displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName))
                Swal.fire('Succes','Ingresado con exito','success')
            })

    }
}

export const startLoginEmailPassword = (email,password) => {
    return (dispatch) => {

        dispatch(startLoading())

        firebase.auth().signInWithEmailAndPassword(email,password)
            .then( ({user}) =>  {

                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())
                Swal.fire('Succes','Ingresado con exito','success')

            }).catch( error => {

                dispatch(finishLoading())
                Swal.fire('Error', error.message, 'error')
                
            })
        
    }
}

export const startRegisterEmailPasswoordName = (email,password,name) => {
    return(dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then( async({user}) => {

                await user.updateProfile({displayName: name})
                dispatch(login(user.uid, user.displayName))
                Swal.fire('Succes','Registrado con exito','success')

            }).catch( error => {
                Swal.fire('Error', error.message, 'error')
            })

    }
}


export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout)
        Swal.fire('Succes','Logout Con exito','success')
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}

