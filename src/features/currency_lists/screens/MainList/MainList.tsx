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

class MainList extends Component<Props> {
    static navigationOptions = (navProps: NavigationScreenProps): NavigationStackScreenOptions => ({
        ...createScreenHeaderOptions(navProps, 'CryptoWatcher'),
    })

    static drawerNavigationOptions: NavigationDrawerScreenOptions = {
        drawerLabel: 'All currencies',
        drawerIcon: <Icon name="md-home" type="ionicon" />,
    }

    componentDidMount(): void {
        const { getDailyStats } = this.props
        getDailyStats()
    }

    render(): ReactElement {
        const { list, isListRefreshing, getDailyStats, lastUpdated } = this.props
        return (
            <View>
                <CurrencyList
                    isListRefreshing={isListRefreshing}
                    currencyList={list}
                    onRefresh={getDailyStats}
                    emptyMessage="Could not retrieve any data."
                    lastUpdated={lastUpdated}
                />
            </View>
        )
    }
}

export default MainList
