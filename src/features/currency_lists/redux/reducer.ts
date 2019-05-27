import {
    CurrencyListsActions,
    GET_DAILY_STATS_LIST,
    GET_DAILY_STATS_LIST_COMMIT,
    GetDailyStatsListCommitAction,
    SET_FAVORITE_SYMBOL,
    SetFavoriteSymbolAction,
} from './types'

interface CurrenciesState {
    lastUpdate: number | null
    list: DailyStatsSymbol[]
    loading: boolean
}

const initialState: CurrenciesState = {
    lastUpdate: null,
    list: [],
    loading: false,
}

const currencyLists = (
    state: CurrenciesState = initialState,
    action: CurrencyListsActions
): CurrenciesState => {
    switch (action.type) {
        case GET_DAILY_STATS_LIST:
            return { ...state, loading: true }
        case GET_DAILY_STATS_LIST_COMMIT:
            return processNewDailyStatsList(state, action)
        case SET_FAVORITE_SYMBOL:
            return setFavoriteSymbol(state, action)
        default:
            return state
    }
}

function processNewDailyStatsList(
    state: CurrenciesState,
    action: GetDailyStatsListCommitAction
): CurrenciesState {
    if (action.payload === undefined) return state

    if (action.payload instanceof Array && action.payload.length > 0) {
        //Convert old list to map for easier access
        const hashmap = new Map(
            state.list.map(
                (value): [DailyStatsSymbol['symbol'], DailyStatsSymbol] => [value.symbol, value]
            )
        )

        //Append the favorite property to the new list checking if existed before on the hashmap
        const newStats = action.payload.map(
            (value): DailyStatsSymbol => {
                const oldSymbolData = hashmap.get(value.symbol)

                let favorite = false
                if (oldSymbolData !== undefined) {
                    favorite = oldSymbolData.favorite
                }

                return { ...value, favorite }
            }
        )

        return { ...state, list: newStats, lastUpdate: Date.now(), loading: false }
    }
    return state
}

function setFavoriteSymbol(
    state: CurrenciesState,
    action: SetFavoriteSymbolAction
): CurrenciesState {
    const newStats = state.list.map(
        (value): DailyStatsSymbol => {
            return value.symbol === action.payload.symbol
                ? { ...value, favorite: action.payload.favorite }
                : value
        }
    )
    return { ...state, list: newStats }
}

export default currencyLists
