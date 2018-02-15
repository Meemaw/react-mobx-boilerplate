import { injectParameters } from '../../lib/urls'

it('does nothing for no url params', () => {
  const url = 'https://api.coinmarketcap.com/v1/ticker/'
  expect(injectParameters(url, {})).toBe(url)
})

it('correctly injects one param', () => {
  const url = 'https://api.coinmarketcap.com/v1/ticker/:coinName'

  expect(injectParameters(url, { coinName: 'bitcoin' })).toBe(
    'https://api.coinmarketcap.com/v1/ticker/bitcoin',
  )

  expect(injectParameters(url, { coinName: 'ethereum' })).toBe(
    'https://api.coinmarketcap.com/v1/ticker/ethereum',
  )
})

it('correctly injects multiple params', () => {
  const url = 'https://api.coinmarketcap.com/:version/ticker/:coinName/:symbol'
  expect(
    injectParameters(url, {
      coinName: 'ethereum',
      symbol: 'ETH',
      version: 'v1',
    }),
  ).toBe('https://api.coinmarketcap.com/v1/ticker/ethereum/ETH')
})

it('removes colons', () => {
  const url = 'https://api.coinmarketcap.com/:version/ticker/:coinName/:symbol'
  expect(injectParameters(url, {})).toBe(
    'https://api.coinmarketcap.com/version/ticker/coinName/symbol',
  )
})

it('adds param', () => {
  const url = 'https://api.coinmarketcap.com/:version/ticker/:coinName/:symbol'
  expect(
    injectParameters(url, {
      coinName: 'bitcoin',
      symbol: 'BTC',
      limit: 100,
      offset: 200,
    }),
  ).toBe('https://api.coinmarketcap.com/version/ticker/bitcoin/BTC?limit=100&offset=200')
})

it('injects with body', () => {
  const url = 'https://api.coinmarketcap.com/:version/ticker/:coinName/:symbol'
  const data = {
    coinName: 'bitcoin',
    symbol: 'BTC',
    limit: 100,
    offset: 200,
  }
  expect(injectParameters(url, data, true)).toBe(
    'https://api.coinmarketcap.com/version/ticker/bitcoin/BTC',
  )
  expect(data).toEqual({
    coinName: 'bitcoin',
    symbol: 'BTC',
    limit: 100,
    offset: 200,
  })
})
