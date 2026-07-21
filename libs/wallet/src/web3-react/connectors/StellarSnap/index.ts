import type { AddEthereumChainParameter, Actions } from '@web3-react/types'

import { STELLAR_SNAP_ID, STELLAR_SNAP_VERSION } from '../../../constants'
import { InjectedWallet } from '../Injected'

interface StellarSnapConnectorConstructorArgs {
  actions: Actions
  onError?: (error: Error) => void
}

/**
 * Connector used to connect an injected wallet (e.g. MetaMask) that also supports Snaps,
 * and additionally requests the installation/connection of the Stellar Snap.
 *
 * This lets users manage Stellar accounts from the same wallet they use to trade on CoW Swap,
 * without CoW Swap having to implement a separate Stellar-specific connection flow.
 *
 * The Snap request never blocks or fails the underlying EVM wallet connection: if the wallet
 * doesn't support Snaps, or the user rejects the Snap prompt, the regular injected connection
 * still succeeds.
 */
export class StellarSnapConnector extends InjectedWallet {
  constructor({ actions, onError }: StellarSnapConnectorConstructorArgs) {
    super({ actions, onError, walletUrl: '', searchKeywords: [] })
  }

  async activate(desiredChainIdOrChainParameters?: number | AddEthereumChainParameter): Promise<void> {
    await super.activate(desiredChainIdOrChainParameters)
    await this.connectStellarSnap()
  }

  /**
   * Requests the wallet to install (if needed) and connect the Stellar Snap.
   * Errors are swallowed on purpose, Snap support is an optional enhancement on top
   * of the regular EVM wallet connection.
   */
  private async connectStellarSnap(): Promise<void> {
    if (!this.provider) return

    try {
      await this.provider.request({
        method: 'wallet_requestSnaps',
        params: {
          [STELLAR_SNAP_ID]: { version: STELLAR_SNAP_VERSION },
        },
      })
    } catch (error) {
      console.debug('[StellarSnapConnector] Failed to connect the Stellar Snap', error)
    }
  }
}
