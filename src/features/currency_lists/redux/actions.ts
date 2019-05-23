import {
    CurrencyListsActions,
    GET_24H_STATS_LIST,
    Set24HStatsListAction,
    SET_24H_STATS_LIST,
} from './types'

export const get24HCurrencyList = (): CurrencyListsActions => ({
    type: GET_24H_STATS_LIST,
})

export const set24HCurrencyList = (
    payload: Set24HStatsListAction['payload']
): CurrencyListsActions => ({
    type: SET_24H_STATS_LIST,
    payload,
})
