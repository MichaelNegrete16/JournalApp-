import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";

import JournalScreen from "../components/journal/JournalScreen";
import AuthRouter from "./AuthRouter";

const AppRouter = () => {
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