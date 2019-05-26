export const GET_DAILY_STATS_LIST = 'GET_DAILY_STATS_LIST'
export const GET_DAILY_STATS_LIST_COMMIT = 'GET_DAILY_STATS_LIST_COMMIT'
export const SET_FAVORITE_SYMBOL = 'SET_FAVORITE_SYMBOL'

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
        /** Transaction number is static so the api call does not get repeated if the user refreshes multiple times  */
        transaction: 1
    }
}

export interface GetDailyStatsListCommitAction {
    type: typeof GET_DAILY_STATS_LIST_COMMIT
    //extract the value of what the api client returns to avoid duplicating types
    // payload?: Result<ReturnType<Binance['dailyStats']>>
    payload?: DailyStatsResult | DailyStatsResult[]
}

export interface SetFavoriteSymbolAction {
    type: typeof SET_FAVORITE_SYMBOL
    payload: {
        symbol: DailyStatsSymbol['symbol']
        favorite: DailyStatsSymbol['favorite']
    }
}

export type CurrencyListsActions =
    | GetDailyStatsListAction
    | GetDailyStatsListCommitAction
    | SetFavoriteSymbolAction

export function isBinanceAction(action: any): action is BinanceClientOfflineAction {
    return action.useBinanceClient
}
