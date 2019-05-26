import {
    CurrencyListsActions,
    GET_DAILY_STATS_LIST,
    SetFavoriteSymbolAction,
    SET_FAVORITE_SYMBOL,
    GET_DAILY_STATS_LIST_COMMIT,
    GetDailyStatsListCommitAction,
} from './types'

/**
 * Create redux-offline action that will call dailyStats of all symbols in Binance
 */
export const getDailyStatsList = (): CurrencyListsActions => ({
    type: GET_DAILY_STATS_LIST,
    // useBinanceClient: true,
    meta: {
        offline: {
            // effect: client.dailyStats,
            effect: { url: 'https://api.binance.com/api/v1/ticker/24hr', method: 'GET' },
            commit: getDailyStatsListCommit(),
        },
        transaction: 1,
    },
})

const getDailyStatsListCommit = (): GetDailyStatsListCommitAction => ({
    type: GET_DAILY_STATS_LIST_COMMIT,
    //payload is injected by redux-offline
})

export const setFavoriteSymbol = (
    symbol: SetFavoriteSymbolAction['payload']['symbol'],
    favorite: SetFavoriteSymbolAction['payload']['favorite']
): CurrencyListsActions => ({
    type: SET_FAVORITE_SYMBOL,
    payload: { symbol, favorite },
})
