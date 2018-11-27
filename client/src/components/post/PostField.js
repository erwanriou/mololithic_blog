import React from "react"

const PostField = ({
  input,
  label,
  value,
  textarea,
  meta: { error, touched }
}) => {
  return (
    <div className="field">
      <label>{label}</label>
      {textarea ? (
        <textarea {...input} value={value} cols="30" rows="10" />
      ) : (
        <input {...input} value={value} />
      )}
      <h5>{touched && error}</h5>
    </div>
  )
}

export default PostField
