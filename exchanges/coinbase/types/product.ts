/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export enum CoinbaseProductStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  INTERNAL = 'internal',
  DELISTED = 'delisted',
}

export interface CoinbaseProduct {
  id: string
  display_name: string
  base_currency: string
  quote_currency: string
  base_increment: string
  quote_increment: string
  min_market_funds: string
  status: CoinbaseProductStatus
  status_message?: string
  auction_mode: boolean
  cancel_only: boolean
  limit_only: boolean
  post_only: boolean
  margin_enabled: boolean
  trading_disabled?: boolean
  max_slippage_percentage?: string
  fx_stablecoin?: boolean
  high_bid_limit_percentage?: string
}
