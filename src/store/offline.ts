import { OfflineAction } from '@redux-offline/redux-offline/lib/types'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'

import { isBinanceAction } from '../features/currency_lists/redux/types'

/**
 * Queue reconciler that lets only one action with the same type stay on the queue
 * Useful to avoid multiple api calls if the user refreshes a list multiple times
 * while he/she is offline
 */
export const queue = {
    ...offlineConfig.queue,
    enqueue(array: OfflineAction[], action: OfflineAction): OfflineAction[] {
        const newArray = array.filter(({ type }): boolean => !(type === action.type))
        newArray.push(action)
        return newArray
    },
}

//This code is not used anymore since the binance api node wrapper had to be deleted
// because of incompatibility with react native (crypto module node dependency)
// Nonetheless I wanted to leave this code here as it was part of the process

/**
 * @deprecated
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

/**
 * @deprecated
 * @param error
 * @param action
 * @param retries
 */
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
