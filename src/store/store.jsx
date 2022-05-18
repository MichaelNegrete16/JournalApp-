import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { authReducer } from '../reducers/authReducer'

// Creacion del store con la nueva version de redux con toolkit
export const store = configureStore({
    reducer: {
        auth: authReducer
    },
    // Configuracion del middleware para cuanto tengamos consultas de api
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware(thunk)
})