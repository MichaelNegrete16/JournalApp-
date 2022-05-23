import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { activeNotes } from '../../actions/notes'

const JournalEntry = (note) => {

    const {id,date,title,body,url} = note
    const noteDate = moment(date)
    
    const dispatch = useDispatch()

    const handleEntryClick = () => {
        dispatch(activeNotes(id,note))
    }

    return (
      <div className='journal__entry pointer' onClick={handleEntryClick}>

          {
            url && 
            <div style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${url})`
            }} className='journal__entry-picture'></div>
          }

          <div className='journal__entry-body'>
              <p className='journal__entry-title'>{title}</p>
              <p className='journal__entry-content'>{body}</p>
          </div>

          <div className='journal__entry-date-box'>
              <span>{noteDate.format('dddd')}</span>
              <h4>{noteDate.format('Do')}</h4>
          </div>

      </div>
    )
}

export default JournalEntry