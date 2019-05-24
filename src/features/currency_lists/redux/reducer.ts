import { CurrencyListsActions, GET_DAILY_STATS_LIST_COMMIT } from './types'

interface CurrenciesState {
    lastUpdate: number | null
    list: DailyStatsSymbol[]
}

const initialState: CurrenciesState = {
    lastUpdate: null,
    list: [],
}

const currencyLists = (
    state: CurrenciesState = initialState,
    action: CurrencyListsActions
): CurrenciesState => {
    switch (action.type) {
        case GET_DAILY_STATS_LIST_COMMIT:
            if (action.payload === undefined) return state

            if (action.payload instanceof Array) {
                const newStats = action.payload.map(
                    (value): DailyStatsSymbol => {
                        return { ...value, favorite: false }
                    }
                )

                return { ...state, list: newStats, lastUpdate: Date.now() }
            }

            return { ...state, list: [...state.list, { ...action.payload, favorite: false }] }
        // case SET_DAILY_STATS_LIST:
        //     return { ...state, list: action.payload, lastUpdate: Date.now() }
        default:
            return state
    }
}

export default currencyLists
