import  {firebase, googleAuthProvider } from '../firebase/firebase-config'
import { types } from "../types/types"
import { finishLoading, startLoading } from './ui'


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

            }).catch( error => {

                console.log(error)
                dispatch(finishLoading())
                
            })
        
    }
}

export const startRegisterEmailPasswoordName = (email,password,name) => {
    return(dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then( async({user}) => {

                await user.updateProfile({displayName: name})
                dispatch(login(user.uid, user.displayName))

            }).catch( error => {
                console.log(error)
            })

    }
}


export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout)
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}

