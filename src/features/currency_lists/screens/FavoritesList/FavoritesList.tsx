import React, { Component, ReactElement } from 'react'
import { View } from 'react-native'
import { NavigationDrawerScreenOptions } from 'react-navigation'
import { CurrencyList } from '../../components'

export interface StoreProps {
    list: DailyStatsSymbol[]
    online: boolean
    isListRefreshing: boolean
    lastUpdated: number | null
}

export interface DispatchProps {
    getDailyStats: () => void
}

type Props = StoreProps & DispatchProps

class FavoritesList extends Component<Props> {
    static navigationOptions: NavigationDrawerScreenOptions = {
        drawerLabel: 'Favorites',
    }

    render(): ReactElement {
        const { list, isListRefreshing, getDailyStats, lastUpdated } = this.props
        return (
            <View>
                <CurrencyList
                    isListRefreshing={isListRefreshing}
                    currencyList={list}
                    onRefresh={getDailyStats}
                    emptyMessage="Looks like you don't have any favorites."
                    lastUpdated={lastUpdated}
                />
            </View>
        )
    }
}

export default FavoritesList
