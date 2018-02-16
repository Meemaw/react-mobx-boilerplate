import React from 'react'
import get from 'dlv'
import { CoinMarketCapApi } from '../../services'
import { CONFIG } from '../../lib/core'

class Dashboard extends React.Component {
  state = {
    result: null,
  }

  componentDidMount() {
    CoinMarketCapApi.get({ coinName: 'bitcoin' }).then(resp => this.setState({ result: resp[0] }))
  }

  render() {
    const { result } = this.state
    return (
      <div>
        <div>Hello to {get(CONFIG, 'env')} environment</div>
        <div>Current price of Bitcoint: {get(result, 'price_usd')}$</div>
      </div>
    )
  }
}

export default Dashboard
