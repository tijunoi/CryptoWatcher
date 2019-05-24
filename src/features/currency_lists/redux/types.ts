import { Binance, DailyStatsResult } from 'binance-api-node'

export const GET_DAILY_STATS_LIST = 'GET_DAILY_STATS_LIST'
export const GET_DAILY_STATS_LIST_COMMIT = 'GET_DAILY_STATS_LIST_COMMIT'
export const SET_DAILY_STATS_LIST = 'SET_DAILY_STATS_LIST'

export interface BinanceClientOfflineAction {
    useBinanceClient: true
}

export interface GetDailyStatsListAction extends BinanceClientOfflineAction {
    type: typeof GET_DAILY_STATS_LIST
    meta: {
        offline: {
            effect: Binance['dailyStats']
            commit: GetDailyStatsListCommitAction
        }
    }
}

export interface GetDailyStatsListCommitAction {
    type: typeof GET_DAILY_STATS_LIST_COMMIT
    //extract the value of what the api client returns to avoid duplicating types
    payload?: Result<ReturnType<Binance['dailyStats']>>
}

export interface SetDailyStatsListAction {
    type: typeof SET_DAILY_STATS_LIST
    payload: DailyStatsResult[]
}

export type CurrencyListsActions =
    | GetDailyStatsListAction
    | GetDailyStatsListCommitAction
    | SetDailyStatsListAction

export function isBinanceAction(action: any): action is BinanceClientOfflineAction {
    return action.useBinanceClient === true
}
