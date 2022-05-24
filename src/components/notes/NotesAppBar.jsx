import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNotes } from '../../actions/notes'

const NotesAppBar = () => {

  const {active} = useSelector(state => state.notes)
  const dispatch = useDispatch()

  const handleSave = () => {
      dispatch(startSaveNotes(active))
  }

  return (
    <div className='notes__appbar'>

        <span>29 de agosto 2022</span>
        
        <div>
            <button className='btn'>Picture</button>
            <button className='btn' onClick={handleSave}>Save</button>
        </div>

    </div>
  )
}

export default NotesAppBar