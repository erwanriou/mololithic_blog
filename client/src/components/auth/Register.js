import React from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Translate } from "react-localize-redux"

import { register } from "../../actions/authActions"
import InputGroup from "../common/InputGroup"

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.register(newUser, this.props.history)
  }
  handleQueryInput(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const { name, email, password, password2, errors } = this.state
    return (
      <div className="layout">
        <div className="opacity">
          <div className="container">
            <main>
              <div className="title">
                <h1>
                  <Translate id="register.title" />
                </h1>
                <h2>
                  <Translate id="register.subtitle" />
                </h2>
              </div>
              <div className="auth register">
                {/* <a href="/auth/google" className="google">
                  <i className="fab fa-google-plus-g" />
                  <span>
                    <Translate id="register.google" />
                  </span>
                </a>
                <a href="/auth/facebook" className="facebook">
                  <i className="fab fa-facebook-f" />
                  <span>
                    <Translate id="register.facebook" />
                  </span>
                </a>
                <a href="/auth/instagram" className="instagram">
                  <i className="fab fa-instagram" />
                  <span>
                    <Translate id="login.instagram" />
                  </span>
                </a>
                <h3>
                  <Translate id="register.option" />
                </h3> */}
                <form className="authform" onSubmit={this.handleSubmit}>
                  <InputGroup
                    placeholder="Your name"
                    name="name"
                    value={name}
                    onChange={this.handleQueryInput}
                    error={errors.name}
                  />
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
                  <InputGroup
                    placeholder="Confirm your Password"
                    name="password2"
                    value={password2}
                    type="password"
                    onChange={this.handleQueryInput}
                    error={errors.password}
                  />
                  <button type="submit">
                    <Translate id="register.register" />
                  </button>
                </form>
                <span>
                  <Translate id="register.noaccount" />
                  <Link to="/login">
                    <Translate id="register.login" />
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
    { register }
  )(Register)
)
