import { OfflineAction } from '@redux-offline/redux-offline/lib/types'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import { isBinanceAction } from '../features/currency_lists/redux/types'

/**
 * Custom effect reconciler to use Binance client for binance-api requests
 * with a passthrough to default redux-offline reconciler for the rest of actions
 * @param effect
 * @param action
 */
export const effect: (effect: any, action: OfflineAction) => Promise<any> = (
    effect: any,
    action: OfflineAction
): Promise<any> => {
    if (isBinanceAction(action)) {
        // effect will be the binance api client function that has to be called, and will return a promise
        return effect()
    } else {
        // fallback to default redux-offline effect
        return offlineConfig.effect(effect, action)
    }
}

export const discard: (error: any, action: OfflineAction, retries: number) => boolean = (
    error: any,
    action: OfflineAction,
    retries: number
): boolean => {
    if (isBinanceAction(action)) {
        return error && retries > 2
    } else {
        return offlineConfig.discard(error, action, retries)
    }
}
