import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNotes } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {

    const {active:note} = useSelector(state => state.notes)

    const dispatch = useDispatch()

    const [formValues,handleInputChange,reset] = useForm(note)
    const {body,title} = formValues

    const activeId = useRef(note.id)

    useEffect(() => {

        if(note.id !== activeId.current){
          reset(note)
          activeId.current=note.id
        }

    }, [note,reset])

    useEffect(()=> {
        dispatch(activeNotes(formValues.id, {...formValues}))
    },[formValues, dispatch])
    

    return (
      <div className='notes__main-content'>
          <NotesAppBar/>

          <div className='notes__content'>
              <input value={title} name='title' onChange={handleInputChange} className='notes__title-input' type="text" placeholder='Some awesome title' autoComplete='off'/>
              <textarea value={body} name='body' onChange={handleInputChange} className='notes__text-area' placeholder='What happen today?'></textarea>
              
              {
                note.url &&
                <div className='notes__image'>
                  <img src="https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg" alt="ImagenTest" />
                </div>
              }

          </div>

      </div>
    )
}

export default NoteScreen