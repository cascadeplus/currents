/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CoinbaseClientOptions } from './options.ts'
import { auth } from './auth.ts'

/**
 * Coinbase API request class.
 */
export class CoinbaseRequest {
  private readonly url: string

  /**
   * @param {string} path Subpath to an api endpoint that all requests from this instance will make.
   * @param {CoinbaseClientOptions} options
   * @param {boolean} has_auth Whether or not this request requires authentication. Defaults to false.
   * @param {string} api_url User supplied API url. Defaults to Coinbase's production Exchange url. Mostly available to allow using sandbox or whatever in development.
   */
  constructor(
    private readonly path: string,
    private readonly options: CoinbaseClientOptions,
    private readonly has_auth = false,
    readonly api_url = 'https://api.exchange.coinbase.com',
  ) {
    this.url = `${api_url}${path}`
  }

  private async getHeaders(
    path: string,
    method: string,
    body: unknown | undefined = undefined,
  ): Promise<HeadersInit> {
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'currents',
    }

    if (this.has_auth) {
      const auth_headers = await auth(this.options, `${this.path}${path}`, method, body)
      Object.assign(headers, auth_headers)
    }

    return headers
  }

  public async get<T>(path = ''): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: 'GET',
      headers: await this.getHeaders(path, 'GET'),
    })
    if (!response.ok) throw new Error(response.statusText)
    else return await response.json() as T
  }

  public async post<T>(body: Record<string, unknown>, path = ''): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: 'POST',
      headers: await this.getHeaders(path, 'POST', body),
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error(response.statusText)
    else return await response.json() as T
  }

  public async put<T>(body: Record<string, unknown>, path = ''): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: 'PUT',
      headers: await this.getHeaders(path, 'PUT', body),
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error(response.statusText)
    else return await response.json() as T
  }

  public async delete<T>(path: string): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      method: 'DELETE',
      headers: await this.getHeaders(path, 'DELETE'),
    })
    if (!response.ok) throw new Error(response.statusText)
    else return await response.json() as T
  }
}
