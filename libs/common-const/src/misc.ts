import { Percent } from '@cowprotocol/currency'

// The canonical zero address, commonly used as a placeholder for native currency
// or as a sentinel value when no address is applicable
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// 30 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 30

// Represents 100% as a Percent instance, useful for calculations that need
// a full percentage reference point (e.g. price impact, slippage checks)
export const ONE_HUNDRED_PERCENT = new Percent('1')
