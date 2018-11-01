import React from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const PostField = ({ input, label, textarea, meta: { error, touched } }) => {
  return (
    <div className="field">
      <label>{label}</label>
      {textarea ? <ReactQuill {...input} /> : <input {...input} />}
      <h5>{touched && error}</h5>
    </div>
  )
}

export default PostField
