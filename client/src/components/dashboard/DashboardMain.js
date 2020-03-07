import React, { Fragment } from "react"
import { connect } from "react-redux"
import { getTranslate } from "react-localize-redux"

import DashboardAdmin from "./admin/DashboardAdmin"
import DashboardUser from "./user/DashboardUser"
import Spinner from "@common/Spinner"

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggle: false
    }
    this.handleToggleAdmin = this.handleToggleAdmin.bind(this)
    this.handleToggleUser = this.handleToggleUser.bind(this)
  }
  handleToggleAdmin() {
    this.setState({
      isToggle: true
    })
  }
  handleToggleUser() {
    this.setState({
      isToggle: false
    })
  }
  render() {
    const { translate } = this.props
    const { user } = this.props.auth
    let dashboardContents = []

    user.authorities.sort().map(role => {
      switch (role) {
        case "ROLE_ADMIN":
          dashboardContents.push(
            <DashboardAdmin translate={translate} key={role} />
          )
          break
        case "ROLE_USER":
          dashboardContents.push(<DashboardUser key={role} />)
          break
        default:
          dashboardContents.push(<Spinner key={role} />)
      }
      return role
    })

    return (
      <Fragment>
        <div className="dashboard-nav">
          <div className="container">
            <div className="menu">
              {user.authorities.length > 1 && (
                <div className="roles">
                  <button
                    onClick={this.handleToggleUser}
                    style={{
                      fontWeight: !this.state.isToggle ? "400" : "100",
                      color: !this.state.isToggle ? "black" : "white",
                      backgroundColor: !this.state.isToggle
                        ? "#de8989"
                        : "#cf6161"
                    }}
                  >
                    {user.authorities[0]}
                  </button>
                  <button
                    onClick={this.handleToggleAdmin}
                    style={{
                      fontWeight: !this.state.isToggle ? "100" : "400",
                      color: !this.state.isToggle ? "white" : "black",
                      backgroundColor: !this.state.isToggle
                        ? "#cf6161"
                        : "#de8989"
                    }}
                  >
                    {user.authorities[1]}
                  </button>
                </div>
              )}
              <div className="user">
                <p>Welcome {user.name}!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard">
          <div className="container">
            {this.state.isToggle === false
              ? dashboardContents[0]
              : dashboardContents[1]}
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.localize),
  auth: state.auth
})

export default connect(mapStateToProps)(Dashboard)
