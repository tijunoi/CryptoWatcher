import { DailyStatsResult } from 'binance-api-node'

declare global {
    interface DailyStatsSymbol extends DailyStatsResult {
        favorite: boolean
    }
}
