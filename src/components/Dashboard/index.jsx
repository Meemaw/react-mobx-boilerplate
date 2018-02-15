import React from 'react'
import get from 'dlv'
import { CoinMarketCapApi } from '../../services'
import { CONFIG } from '../../lib/core'

class Dashboard extends React.Component {
  componentDidMount() {
    CoinMarketCapApi.get({ coinName: 'bitcoin' }).then(resp => console.log(resp))
  }
  render() {
    return <div>Hello to qwewq : {get(CONFIG, 'env')}</div>
  }
}

export default Dashboard
