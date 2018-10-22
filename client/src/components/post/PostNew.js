import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

class PostNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: true,
      showFormReview: false,
    }
  }
  render() {
    return (
      <main>
        NEW POST
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

PostNew = reduxForm({ form: 'PostForm' })(PostNew)
export default connect(mapStateToProps)(PostNew)
