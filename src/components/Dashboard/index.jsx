import React, { Component } from 'react'
import { CoinMarketCapApi } from '../../services'

import { CONFIG } from '../../lib/core'

class Dashboard extends Component {
  componentDidMount() {
    CoinMarketCapApi.get({ coinName: 'bitcoin' }).then(resp => console.log(resp))
  }
  render() {
    return <div>Hello to qwewqe: {CONFIG.env}</div>
  }
}

export default Dashboard
