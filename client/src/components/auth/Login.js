import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../../actions/authActions'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errors: {},
    }
    this.handleQueryInput = this.handleQueryInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const { role } = this.props.auth.user
    role
      ? role === 'admin' && this.props.history.push('/dashboard-admin')
      : role === 'user' && this.props.history.push('/dashboard')
  }
  componentDidUpdate(prevProps) {
    const { role } = this.props.auth.user
    role
      ? role === 'admin' && this.props.history.push('/dashboard-admin')
      : role === 'user' && this.props.history.push('/dashboard')
  }
  handleSubmit(e) {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.login(
      userData,
      this.props.history
    )
  }
  handleQueryInput(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const { email, password, errors } = this.state
    return (
      <main className='layout'>
        <div className="opacity">
          <div className="container">
            <div className="title">
              <h1> Login in the application</h1>
              <h2> You can choose by Sign-In with google, facebook or password authentification</h2>
            </div>
            <div className="auth login">
              <a href='/auth/google' className="google">
                <i className="fab fa-google-plus-g"></i>
                <span>Sign In with google</span>
              </a>
              <a href='/auth/facebook' className="facebook">
                <i className="fab fa-facebook-f"></i>
                <span>Sign In with facebook</span>
              </a>
              <h3>Or Login here</h3>
              <form
                className='authform'
                onSubmit={this.handleSubmit}>
                <input
                  placeholder='Your Email'
                  name='email'
                  type='email'
                  value={email}
                  onChange={this.handleQueryInput}
                />
                <input
                  placeholder='Required Password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={this.handleQueryInput}
                />
                <button type='submit'>
                  Login
                </button>
              </form>
              <span>You doen't have an account yet?
                <Link to='/register'>Register</Link>
              </span>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default withRouter(connect(mapStateToProps, { login })(Login))
