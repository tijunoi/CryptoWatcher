import { createSelector } from 'reselect'
import { AppState } from '../../../store'

export const getSymbolList = (state: AppState): AppState['currencyLists']['list'] =>
    state.currencyLists.list

export const getLastUpdate = (state: AppState): AppState['currencyLists']['lastUpdate'] =>
    state.currencyLists.lastUpdate

export const getLoading = (state: AppState): AppState['currencyLists']['loading'] =>
    state.currencyLists.loading

/**
 * Filter symbol list for pairs that match with USDT
 * Based on the screenshot of the Coding test PDF, only shows the price of
 * crypto currencies in US dollars
 */
export const getUSDTSymbols = createSelector(
    getSymbolList,
    (list): DailyStatsSymbol[] => {
        return list.filter((value): boolean => value.symbol.endsWith('USDT'))
    }
)

export const getFavorites = createSelector(
    getUSDTSymbols,
    (list): DailyStatsSymbol[] => {
        return list.filter((value): boolean => value.favorite)
    }
)

export const getTopGainers = createSelector(
    getUSDTSymbols,
    (list): DailyStatsSymbol[] => {
        return list.sort(
            (a, b): number => {
                const priceChangeA = Number(a.priceChangePercent)
                const priceChangeB = Number(b.priceChangePercent)

                return priceChangeB - priceChangeA
            }
        )
    }
)
