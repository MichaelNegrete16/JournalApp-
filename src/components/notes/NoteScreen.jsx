import React from 'react'
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {
  return (
    <div className='notes__main-content'>
        <NotesAppBar/>

        <div className='notes__content'>
            <input className='notes__title-input' type="text" placeholder='Some awesome title' autoComplete='off'/>
            <textarea className='notes__text-area' placeholder='What happen today?'></textarea>
            <div className='notes__image'>
                <img src="https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg" alt="ImagenTest" />
            </div>
        </div>

    </div>
  )
}

export default NoteScreen