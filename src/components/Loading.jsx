import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <div className='flex justify-center items-center'>
            <h1 className='text-center font-extrabold text-green'>Түр хүлээнэ үү!...</h1>
        </div>
        <div className='flex justify-center items-center'>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-lg"></span>
        </div>
        
       
    </div>
  )
}

export default Loading