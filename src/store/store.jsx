import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../reducers/authReducer'

// Creacion del store con la nueva version de redux con toolkit
export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})