import React from "react"

const PostField = ({ input, label, textarea, meta: { error, touched } }) => {
  return (
    <div className="field">
      <label>{label}</label>
      {textarea ? (
        <textarea {...input} cols="30" rows="10" />
      ) : (
        <input {...input} />
      )}
      <h5>{touched && error}</h5>
    </div>
  )
}

export default PostField
