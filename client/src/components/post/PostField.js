import React from 'react'

const PostField = ({ input, label, meta: { error, touched} }) => {
  return (
    <div className='field'>
      <label>{label}</label>
      <input {...input} />
      <span>{ touched && error }</span>
    </div>
  )
}

export default PostField
