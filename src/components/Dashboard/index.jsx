import React, { Component } from 'react'
import { CoinMarketCapApi } from '../../services'

class Dashboard extends Component {
  componentDidMount() {
    CoinMarketCapApi.get({ coinName: 'bitcoin' }).then(resp => console.log(resp))
  }
  render() {
    return <div>Dashboard</div>
  }
}

export default Dashboard
