import React from 'react'

export default function LoadingButton({text, loading, handleClick}) {
  return (
    <>
        {
            loading ? 
            <div className='text-center mt-3'>
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> 
            :
            <div className='text-center mt-3'>
                <button className='btn btn-primary' onClick={() => handleClick()}>{text}</button>
            </div>
        }
    </>
  )
}
