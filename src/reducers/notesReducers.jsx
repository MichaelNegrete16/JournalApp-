import { types } from "../types/types"

/*  Esto es lo que contendra este reducer

    {
        notes: [],
        active: null,
        active: {
            id:'',
            title: '0',
            body:'',
            img:'',
            date:''
        }
    }

*/
const initialState = {
    notes:[],
    active:null
}

export const notesReducers = (state = initialState, action) => {

    switch (action.type) {

        case types.notesActive:
            return{
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.notesLoad:
            return{
                ...state,
                notes:[...action.payload]
            }
        case types.notesUpdate:
            return{
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id 
                                    ? action.payload.note
                                    : note
                    )
            }
        case types.notesDelete:
            return{
                ...state,
                active:null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
            
        default:
            return state
    }

}