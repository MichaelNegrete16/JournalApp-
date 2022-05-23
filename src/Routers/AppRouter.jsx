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
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { loadNotes } from "../helpers/loadNotes";
import { setNotes } from "../actions/notes";

const AppRouter = () => {

    const dispatch = useDispatch()

    const [checkign, setCheckign] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Saber si ya esta autenticado o no el usuario
    useEffect(() => {
       firebase.auth().onAuthStateChanged(async user => {

          if(user?.uid){
              dispatch(login(user.uid, user.displayName))
              setIsLoggedIn(true)
              const notes = await loadNotes(user.uid)
              dispatch(setNotes(notes))
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
              <Route path="/auth/*" element={<PublicRoute isAuth={isLoggedIn}> <AuthRouter/> </PublicRoute>}/>
              <Route exact path="/" element={<PrivateRoute isAuth={isLoggedIn}> <JournalScreen/> </PrivateRoute>} />

              {/* Si ninguna ruta es valida caera aqui */}
              <Route path="*" element={<Navigate replace to='/auth/login'/>} />
              
          </Routes>
      </BrowserRouter>
    )
}

export default AppRouter