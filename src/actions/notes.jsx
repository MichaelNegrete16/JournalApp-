import Swal from "sweetalert2"
import { db } from "../firebase/firebase-config"
import { fileUpload } from "../helpers/fileUpload"
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
        dispatch(addNewNotes(doc.id, newNote))
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

export const addNewNotes = (id,note) => {
    return{
        type: types.notesAddNew,
        payload:{
            id, ...note
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
        try {
            await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
            dispatch(refreshNote(note.id, note))
            Swal.fire('Nota Actualizada',note.title,'success')
        } catch (error) {
            console.log(error)
        }
    }
}

export const refreshNote = (id, note) => {
    return {
        type: types.notesUpdate,
        payload: {
            id,
            note: {
                id,
                ...note
            }
        }
    }
}

export const startUploading = file => {
    return async (dispatch,getState) => {
        const {active:activeNote} = getState().notes

        // mostrar alerta de cargando
        Swal.fire({
            title: 'Cargando...',
            text:'Espere un momento...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading()
            }
        })

        const fileUrl = await fileUpload(file)
        const updateNote = {...activeNote, url:fileUrl}
        dispatch(startSaveNotes(updateNote))
        
        // Cerrar alerta
        Swal.close()
    }
}

export const startDelete = id => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid
        try {
            await db.doc(`${uid}/journal/notes/${id}`).delete()
            dispatch(deleteNote(id))
            Swal.fire('Eliminando..','Eliminado correctamente','success')
        } catch (error) {
            console.log(error)   
        }
    }
}

export const deleteNote = id => {
    return{
        type: types.notesDelete,
        payload: id
    }
}

export const noteLogout = () => {
    return{
        type: types.notesLogoutCleaning
    }
} 