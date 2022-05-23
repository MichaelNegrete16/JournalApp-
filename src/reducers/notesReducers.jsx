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
            
        default:
            return state
    }

}