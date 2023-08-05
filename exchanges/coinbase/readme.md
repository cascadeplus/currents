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
import { CoinbaseClientOptions, CoinbaseRequest } from 'coinbase'

const options: CoinbaseClientOptions = {
  key: '<API_KEY>',
  pass: '<API_PASSPHRASE>',
  secret: '<API_SECRET>',
}

// Create a new request client for a specific resource
const products = new CoinbaseRequest('/products', options)
const all = await products.get()
const single = await products.get('/BTC-USD')

// Authenticated...
const profiles = await new CoinbaseRequest('/profiles', options, true).get()
```
