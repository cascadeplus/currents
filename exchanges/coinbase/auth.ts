/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseClientOptions } from './options.ts'
import { decode, encode } from 'std/encoding/base64.ts'

export interface CoinbaseAuth {
  'CB-ACCESS-KEY': string
  'CB-ACCESS-PASSPHRASE': string
  'CB-ACCESS-SIGN': string
  'CB-ACCESS-TIMESTAMP': string
}

/**
 * Returns Coinbase API authentication headers.
 * @param {CoinbaseClientOptions} options
 * @param {string} path Full path to the API endpoint.
 * @param {string} method HTTP method.
 * @param {unknown} body Any body, if applicable. Will be stringified.
 * @returns {Promise<CoinbaseAuth>} Authentication headers.
 */
export async function auth(
  options: CoinbaseClientOptions,
  path: string,
  method: string,
  body: unknown | undefined = undefined,
): Promise<CoinbaseAuth> {
  const timestamp = `${Date.now() / 1000}`
  const message = `${timestamp}${method}${path}${body === undefined ? '' : JSON.stringify(body)}`
  const secret = decode(options.secret)
  const key = await crypto.subtle.importKey(
    'raw',
    secret,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))

  return {
    'CB-ACCESS-KEY': options.key,
    'CB-ACCESS-PASSPHRASE': options.pass,
    'CB-ACCESS-SIGN': encode(signature),
    'CB-ACCESS-TIMESTAMP': timestamp,
  }
}
