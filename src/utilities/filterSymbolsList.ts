// @ts-ignore
import Crypto from 'cryptocurrencies'

export default function filterSymbolsList(search: string): (value: DailyStatsSymbol) => boolean {
    return (value: DailyStatsSymbol): boolean => {
        //Remove USDT from the symbol pair to get the crypto symbol
        const symbol = value.symbol.slice(0, -4)
        const symbolName: string = Crypto[symbol] || ''

        return (
            symbol.includes(search.toUpperCase()) ||
            symbolName.toUpperCase().includes(search.toUpperCase())
        )
    }
}
