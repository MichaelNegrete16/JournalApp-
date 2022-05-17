import React from 'react'

const JournalEntry = () => {
  return (
    <div className='journal__entry pointer'>

        <div style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg)'
        }} className='journal__entry-picture'></div>

        <div className='journal__entry-body'>
            <p className='journal__entry-title'>Un nuevo dia</p>
            <p className='journal__entry-content'>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
        </div>

        <div className='journal__entry-date-box'>
            <span>Monday</span>
            <h4>28</h4>
        </div>

    </div>
  )
}

export default JournalEntry