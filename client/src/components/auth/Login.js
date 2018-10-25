import React from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Translate } from "react-localize-redux"

import { login } from "../../actions/authActions"
import InputGroup from "../common/InputGroup"

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      errors: {}
    }
    this.handleQueryInput = this.handleQueryInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const { isAuthenticated } = this.props.auth
    isAuthenticated && this.props.history.push("/dashboard")
  }
  componentDidUpdate(prevProps) {
    const { isAuthenticated } = this.props.auth
    isAuthenticated && this.props.history.push("/dashboard")
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors })
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(userData, this.props.history)
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
      <div className="layout">
        <div className="opacity">
          <div className="container">
            <main>
              <div className="title">
                <h1>
                  <Translate id="login.title" />
                </h1>
                <h2>
                  <Translate id="login.subtitle" />
                </h2>
              </div>
              <div className="auth login">
                <a href="/auth/google" className="google">
                  <i className="fab fa-google-plus-g" />
                  <span>
                    <Translate id="login.google" />
                  </span>
                </a>
                <a href="/auth/facebook" className="facebook">
                  <i className="fab fa-facebook-f" />
                  <span>
                    <Translate id="login.facebook" />
                  </span>
                </a>
                <a href="/auth/instagram" className="instagram">
                  <i className="fab fa-instagram" />
                  <span>
                    <Translate id="login.instagram" />
                  </span>
                </a>
                <h3>
                  <Translate id="login.option" />
                </h3>
                <form className="authform" onSubmit={this.handleSubmit}>
                  <InputGroup
                    placeholder="Your Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={this.handleQueryInput}
                    error={errors.email}
                  />
                  <InputGroup
                    placeholder="Required Password"
                    name="password"
                    value={password}
                    type="password"
                    onChange={this.handleQueryInput}
                    error={errors.password}
                  />
                  <button type="submit">
                    <Translate id="login.login" />
                  </button>
                </form>
                <span>
                  <Translate id="login.noaccount" />
                  <Link to="/register">
                    <Translate id="login.register" />
                  </Link>
                </span>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(Login)
)
