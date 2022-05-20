import  {firebase, googleAuthProvider } from '../firebase/firebase-config'
import { types } from "../types/types"


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
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then( ({user}) =>  {
                dispatch(login(user.uid, user.displayName))
            }).catch( error => {
                console.log(error)
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

