import Binance from 'binance-api-node'
import {
    CurrencyListsActions,
    GET_24H_STATS_LIST,
    Set24HStatsListAction,
    SET_24H_STATS_LIST,
} from './types'

const client = Binance()

/**
 * Create redux-offline action that will call dailyStats of all symbols in Binance
 */
export const get24HCurrencyList = (): CurrencyListsActions => ({
    type: GET_24H_STATS_LIST,
    useBinanceClient: true,
    meta: {
        offline: { effect: client.dailyStats },
    },
})

export const set24HCurrencyList = (
    payload: Set24HStatsListAction['payload']
): CurrencyListsActions => ({
    type: SET_24H_STATS_LIST,
    payload,
})
