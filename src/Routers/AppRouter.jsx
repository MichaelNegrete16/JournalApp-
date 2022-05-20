import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";

import { useDispatch } from "react-redux"; 

import JournalScreen from "../components/journal/JournalScreen";
import AuthRouter from "./AuthRouter";

import {firebase} from "../firebase/firebase-config";
import { login } from "../actions/auth";

const AppRouter = () => {

    const dispatch = useDispatch()

    const [checkign, setCheckign] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Saber si ya esta autenticado o no el usuario
    useEffect(() => {
       firebase.auth().onAuthStateChanged(user => {

          if(user?.uid){
              dispatch(login(user.uid, user.displayName))
              setIsLoggedIn(true)
          }else{
            setIsLoggedIn(false)
          }
          
          setCheckign(false)
      })
    },[dispatch, setCheckign, setIsLoggedIn])

    if(checkign){
      return (
        <h1>Espere.. </h1>
      )
    }

    return (
      <BrowserRouter>
          <Routes>
              {/* El * al final de la ruta indica que tiene hijos para poder encadenarlos */}
              <Route path="/auth/*" element={<AuthRouter/>}/>
              <Route exact path="/" element={<JournalScreen/>} />

              {/* Si ninguna ruta es valida caera aqui */}
              <Route path="*" element={<Navigate replace to='/auth/login'/>} />
              
          </Routes>
      </BrowserRouter>
    )
}

export default AppRouter