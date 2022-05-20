import { useEffect } from "react";
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

    // Saber si ya esta autenticado o no el usuario
    useEffect(() => {
       firebase.auth().onAuthStateChanged(user => {
          if(user?.uid){
              dispatch(login(user.uid, user.displayName))
          }
      })
    },[dispatch])

    return (
      <BrowserRouter>
          <Routes>
              {/* El * al final de la ruta indica que tiene hijos para poder encadenarlos */}
              <Route path="/auth/*" element={<AuthRouter/>}/>
              <Route exact path="/" element={<JournalScreen/>} />

              {/* Si ninguna ruta es valida caera aqui */}
              <Route path="*" element={<Navigate replace to='/auth'/>} />
              
          </Routes>
      </BrowserRouter>
    )
}

export default AppRouter