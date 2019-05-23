import { OfflineAction } from '@redux-offline/redux-offline/lib/types'

export const GET_24H_STATS_LIST = 'GET_24H_STATS_LIST'
export const SET_24H_STATS_LIST = 'SET_24H_STATS_LIST'

export interface BinanceClientOfflineAction extends OfflineAction {
    useBinanceClient: true
}

export interface Get24HStatsListAction extends BinanceClientOfflineAction {
    type: typeof GET_24H_STATS_LIST
}

export interface Set24HStatsListAction {
    type: typeof SET_24H_STATS_LIST
    payload: Symbol24H[]
}

export type CurrencyListsActions = Get24HStatsListAction | Set24HStatsListAction

export function isBinanceAction(action: any): action is BinanceClientOfflineAction {
    return action.useBinanceClient === true
}
