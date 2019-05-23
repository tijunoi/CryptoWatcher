export const GET_24H_STATS_LIST = 'GET_24H_STATS_LIST'
export const SET_24H_STATS_LIST = 'SET_24H_STATS_LIST'

export interface Get24HStatsListAction {
    type: typeof GET_24H_STATS_LIST
}

export interface Set24HStatsListAction {
    type: typeof SET_24H_STATS_LIST
    payload: Symbol24H[]
}

export type CurrencyListsActions = Get24HStatsListAction | Set24HStatsListAction
