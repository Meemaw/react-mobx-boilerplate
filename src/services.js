import api from './lib/api'

const { GET } = api

export const CoinMarketCapApi = {
  get: GET('https://api.coinmarketcap.com/v1/ticker/:coinName/'),
}
