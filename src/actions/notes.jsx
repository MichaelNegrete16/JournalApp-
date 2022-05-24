import { db } from "../firebase/firebase-config"
import { loadNotes } from "../helpers/loadNotes"
import { types } from "../types/types"

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        dispatch(activeNotes(doc.id, newNote))
    }
}

export const activeNotes = (id, note) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}

export const startLoadingNotes = uid => {
    return async (dispatch) => {
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
        
    }
}

export const setNotes = notes => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const startSaveNotes = note => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth
        
        // si la url de una imagen no se manda se elimina
        if(!note.url){
            delete note.url
        }

        // creo un variable para guardar las notas y eliminar el id para que no se guarde
        const noteToFirestore = {...note}
        delete noteToFirestore.id

        // Actualizar las notas
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
    }
}