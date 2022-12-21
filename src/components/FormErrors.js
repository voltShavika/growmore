import React from 'react'

export default function FormErrors({errors}) {
  return (
    <>
        {
            errors.length > 0 && 
            <div className='alert alert-danger'>
                <ul>
                    {
                        errors.map((e, i) => <li key={i}>{e}</li>)
                    }
                </ul>
            </div>
        }
    </>
  )
}
