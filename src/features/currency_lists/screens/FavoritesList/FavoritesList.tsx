import React, { Component, ReactElement } from 'react'
import { View } from 'react-native'
import {
    NavigationDrawerScreenOptions,
    NavigationScreenProps,
    NavigationStackScreenOptions,
} from 'react-navigation'
import { Icon } from 'react-native-elements'
import { CurrencyList } from '../../components'
import { createScreenHeaderOptions } from '../screenHeader'

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
    static navigationOptions = (navProps: NavigationScreenProps): NavigationStackScreenOptions => ({
        ...createScreenHeaderOptions(navProps, 'Your favorites'),
    })

    static drawerNavigationOptions: NavigationDrawerScreenOptions = {
        drawerLabel: 'Favorites',
        drawerIcon: <Icon name="md-star" type="ionicon" />,
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
