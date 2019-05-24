export const GET_DAILY_STATS_LIST = 'GET_DAILY_STATS_LIST'
export const GET_DAILY_STATS_LIST_COMMIT = 'GET_DAILY_STATS_LIST_COMMIT'
export const SET_DAILY_STATS_LIST = 'SET_DAILY_STATS_LIST'

/**
 * @deprecated
 * Actions that would use the binance client would extend this interface.
 * It is deprecated since the Binance node wrapper has incompatibilities with react-native
 */
export interface BinanceClientOfflineAction {
    useBinanceClient: true
}

export interface GetDailyStatsListAction {
    type: typeof GET_DAILY_STATS_LIST
    meta: {
        offline: {
            effect: { url: 'https://api.binance.com/api/v1/ticker/24hr'; method: 'GET' }
            commit: GetDailyStatsListCommitAction
        }
    }
}

export interface GetDailyStatsListCommitAction {
    type: typeof GET_DAILY_STATS_LIST_COMMIT
    //extract the value of what the api client returns to avoid duplicating types
    // payload?: Result<ReturnType<Binance['dailyStats']>>
    payload?: DailyStatsResult | DailyStatsResult[]
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
    return action.useBinanceClient
}
