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
    })

    return (
      <Fragment>
        <div className="dashboard-nav">
          <div className="container">
            <button
              onClick={this.handleToggleAdmin}
              style={{fontWeight: !this.state.isToggle ? '400' : '100'}}>
              {user.role[0]}
            </button>
            { user.role[1] &&
              <button
                onClick={this.handleToggleUser}
                style={{fontWeight: !this.state.isToggle ? '400' : '100'}}>
                {user.role[1]}
              </button>
            }
          </div>
        </div>
        <div className="dashboard">
          <div className="container">
            {this.state.isToggle === true
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
