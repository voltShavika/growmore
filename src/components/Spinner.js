import React from 'react'

export default function Spinner({loading}) {
  return (
    <>
        {
            loading &&
            <div className='text-center mt-3'>
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> 
        }
    </>
  )
}
