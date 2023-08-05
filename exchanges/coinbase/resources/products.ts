/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseClientOptions } from '../options.ts'
import { CoinbaseProduct } from '../types/product.ts'
import { CoinbaseRequest } from '../request.ts'

export class CoinbaseProducts {
  private readonly path = '/products'
  private readonly request: CoinbaseRequest

  constructor(private readonly options: CoinbaseClientOptions, url?: string) {
    this.request = new CoinbaseRequest(this.path, this.options, false, url)
  }

  public async all(): Promise<CoinbaseProduct[]> {
    return await this.request.get<CoinbaseProduct[]>()
  }

  public async get(id: string): Promise<CoinbaseProduct> {
    return await this.request.get<CoinbaseProduct>(`/${id}`)
  }
}
