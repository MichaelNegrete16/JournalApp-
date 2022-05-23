import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {

    const {active:note} = useSelector(state => state.notes)

    const [formValues,handleInputChange,reset] = useForm(note)
    const {body,title} = formValues

    const activeId = useRef(note.id)

    useEffect(() => {

        if(note.id !== activeId.current){
          reset(note)
          activeId.current=note.id
        }

    }, [note,reset])
    

    return (
      <div className='notes__main-content'>
          <NotesAppBar/>

          <div className='notes__content'>
              <input value={title} onChange={handleInputChange} className='notes__title-input' type="text" placeholder='Some awesome title' autoComplete='off'/>
              <textarea value={body} onChange={handleInputChange} className='notes__text-area' placeholder='What happen today?'></textarea>
              
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