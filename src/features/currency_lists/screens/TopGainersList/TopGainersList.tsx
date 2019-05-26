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

class TopGainersList extends Component<Props> {
    static navigationOptions = (navProps: NavigationScreenProps): NavigationStackScreenOptions => ({
        ...createScreenHeaderOptions(navProps, 'Top gainers | 24h'),
    })

    static drawerNavigationOptions: NavigationDrawerScreenOptions = {
        drawerLabel: 'Top gainers',
        drawerIcon: <Icon name="md-ribbon" type="ionicon" />,
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
                    emptyMessage="Could not retrieve any data"
                    lastUpdated={lastUpdated}
                />
            </View>
        )
    }
}

export default TopGainersList
