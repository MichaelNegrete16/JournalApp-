import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../reducers/authReducer'
import { notesReducers } from '../reducers/notesReducers'
import { uiReducer } from '../reducers/uiReducer'


// Creacion del store con la nueva version de redux con toolkit
// El Combine Store ya viene por defecto en esta nueva funcion

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        notes: notesReducers
    }
})