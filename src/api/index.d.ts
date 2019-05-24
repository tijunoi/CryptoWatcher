// import { DailyStatsResult } from 'binance-api-node'
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { getDailyStatsList } from '../features/currency_lists/redux/actions'

declare global {
    /**
     * Currency pair type with favorite property
     */
    interface DailyStatsSymbol extends DailyStatsResult {
        favorite: boolean
    }

    /**
     * DailyStatsResult from Binance API
     */
    interface DailyStatsResult {
        symbol: string
        priceChange: string
        priceChangePercent: string
        weightedAvgPrice: string
        prevClosePrice: string
        lastPrice: string
        lastQty: string
        bidPrice: string
        bidQty: string
        askPrice: string
        askQty: string
        openPrice: string
        highPrice: string
        lowPrice: string
        volume: string
        quoteVolume: string
        openTime: number
        closeTime: number
        firstId: number
        lastId: number
        count: number
    }
}
