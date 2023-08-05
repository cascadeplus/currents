/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseClientOptions } from './options.ts'
import { CoinbaseProducts } from './resources/products.ts'

export const DEFAULT_OPTIONS: CoinbaseClientOptions = { key: '', pass: '', secret: '' }

export class CoinbaseClient {
  public readonly products: CoinbaseProducts

  public constructor(
    private readonly options: CoinbaseClientOptions = DEFAULT_OPTIONS,
    url?: string,
  ) {
    this.products = new CoinbaseProducts(this.options, url)
  }
}
