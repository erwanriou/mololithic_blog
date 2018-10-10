import React from 'react'
import { connect } from 'react-redux'

import DashboardAdmin from './DashboardAdmin'
import DashboardUser from './DashboardUser'
import Spinner from '../common/Spinner'

class DashBoard extends React.Component {
  render() {
    const  { user, loading } = this.props.auth
    let dashboardContent

    loading || user.avatar === undefined
      ? dashboardContent = <Spinner />
      : user.role === 'admin'
        ? dashboardContent = <DashboardAdmin />
        : dashboardContent = <DashboardUser />

    return (
      <div className="dashboard">
        <div className="container">
          {dashboardContent}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(DashBoard)
