import {
    CurrencyListsActions,
    GET_DAILY_STATS_LIST,
    SetDailyStatsListAction,
    SET_DAILY_STATS_LIST,
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
    },
})

const getDailyStatsListCommit = (): GetDailyStatsListCommitAction => ({
    type: GET_DAILY_STATS_LIST_COMMIT,
    //payload is injected by redux-offline
})

export const setDailyStatsList = (
    payload: SetDailyStatsListAction['payload']
): CurrencyListsActions => ({
    type: SET_DAILY_STATS_LIST,
    payload,
})
