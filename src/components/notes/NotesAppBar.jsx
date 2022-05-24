import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNotes, startUploading } from '../../actions/notes'

const NotesAppBar = () => {

  const {active} = useSelector(state => state.notes)
  const dispatch = useDispatch()

  const handleSave = () => {
      dispatch(startSaveNotes(active))
  }

  const handlePicture = () => {
    document.querySelector('#fileSelector').click()
  }

  const handleFileChange = (e) => {
      const file = e.target.files[0]
      if(file){
        dispatch(startUploading(file))
      }
  }

  return (
    <div className='notes__appbar'>

        <span>29 de agosto 2022</span>

        <input type="file" name='file' id='fileSelector' style={{display: 'none'}} onChange={handleFileChange}/>
        
        <div>
            <button className='btn' onClick={handlePicture}>Picture</button>
            <button className='btn' onClick={handleSave}>Save</button>
        </div>

    </div>
  )
}

export default NotesAppBar