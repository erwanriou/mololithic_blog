import React from "react"

const PostField = ({
  value,
  label,
  onChange,
  name,
  type,
  placeholder,
  textarea,
  error
}) => {
  return (
    <div className="field">
      <label>{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          placeholder={placeholder}
          cols="30"
          rows="10"
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          placeholder={placeholder}
        />
      )}
      <h5>{error}</h5>
    </div>
  )
}

export default PostField
