import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import DashboardAdmin from './DashboardAdmin'
import DashboardUser from './DashboardUser'
import Spinner from '../common/Spinner'

class DashBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggle: false,
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
    const  { user, loading } = this.props.auth
    let dashboardContents = []

    user.role.map(role => {
      switch (role) {
        case 'admin':
          dashboardContents.push(<DashboardAdmin key={role}/>)
          break
        case 'user':
          dashboardContents.push(<DashboardUser key={role}/>)
          break
        default:
          dashboardContents.push(<Spinner key={role}/>)
      }
      return role
    })

    return (
      <Fragment>
        <div className="dashboard-nav">
          <div className="container">
            <div className="menu">
              { user.role.length > 1 &&
                <div className="roles">
                  <button
                    onClick={this.handleToggleUser}
                    style={{
                      fontWeight: !this.state.isToggle ? '400' : '100',
                      color: !this.state.isToggle ? 'black' : 'white',
                      border: !this.state.isToggle ? '1px solid white' : 'none',
                      backgroundColor: !this.state.isToggle ? '#de8989' : '#cf6161'
                    }}>
                    {user.role[0]}
                  </button>
                  <button
                    onClick={this.handleToggleAdmin}
                    style={{
                      fontWeight: !this.state.isToggle ? '100' : '400',
                      color: !this.state.isToggle ? 'white' : 'black',
                      border: !this.state.isToggle ? 'none' : '1px solid white',
                      backgroundColor: !this.state.isToggle ? '#cf6161' : '#de8989'
                    }}>
                    {user.role[1]}
                  </button>
                </div>
              }
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
              : dashboardContents[1]
            }
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(DashBoard)
