# currents / exchanges / coinbase

Simple request provider for interacting with the
[Coinbase Exchange API](https://docs.cloud.coinbase.com/exchange/reference) through REST in deno.

## Install

```jsonc
# deno.json
{
  "imports": {
    "coinbase": "https://deno.land/x/currents@0.1.0/exchanges/coinbase/mod.ts"
  }
}
```

## Usage

```typescript
import { CoinbaseClient, CoinbaseClientOptions, CoinbaseRequest } from 'coinbase'

const options: CoinbaseClientOptions = {
  key: '<API_KEY>',
  pass: '<API_PASSPHRASE>',
  secret: '<API_SECRET>',
}

// Use the client (recommended)
const coinbase = new CoinbaseClient(options) // Options are only required for authenticated requests.
const btc = coinbase.products.get('BTC-USD')

// Create a new request client for a specific resource, useful for the plethora
// of resources that aren't modeled yet.
const products = new CoinbaseRequest('/products', options)
const all = await products.get()
const single = await products.get('/BTC-USD')

// Authenticated...
const profiles = await new CoinbaseRequest('/profiles', options, true).get()
```
