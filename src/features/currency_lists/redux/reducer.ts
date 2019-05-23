import { CurrencyListsActions, SET_24H_STATS_LIST } from './types'

interface CurrenciesState {
    lastUpdate: number | null
    list: Symbol24H[]
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
        case SET_24H_STATS_LIST:
            return { ...state, list: action.payload, lastUpdate: Date.now() }
        default:
            return state
    }
}

export default currencyLists
