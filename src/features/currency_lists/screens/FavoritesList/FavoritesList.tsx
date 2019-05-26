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
import showOfflineSnackbarMessage from '../../../../utilities/showOfflineSnackbarMessage'

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

    onRefreshList = (): void => {
        const { online, getDailyStats } = this.props
        if (!online) {
            showOfflineSnackbarMessage()
        }
        getDailyStats()
    }

    render(): ReactElement {
        const { list, isListRefreshing, lastUpdated } = this.props
        return (
            <View>
                <CurrencyList
                    isListRefreshing={isListRefreshing}
                    currencyList={list}
                    onRefresh={this.onRefreshList}
                    emptyMessage="Looks like you don't have any favorites."
                    lastUpdated={lastUpdated}
                />
            </View>
        )
    }
}

export default FavoritesList
