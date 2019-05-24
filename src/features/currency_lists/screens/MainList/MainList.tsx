import React, { Component, ReactElement } from 'react'
import { View } from 'react-native'
import { NavigationDrawerScreenOptions } from 'react-navigation'
import { CurrencyList } from '../../components'

export interface StoreProps {
    list: DailyStatsSymbol[]
    online: boolean
    isListRefreshing: boolean
}

export interface DispatchProps {
    getDailyStats: () => void
}

type Props = StoreProps & DispatchProps

class MainList extends Component<Props> {
    static navigationOptions: NavigationDrawerScreenOptions = {
        drawerLabel: 'All currencies',
    }

    componentDidMount(): void {
        const { getDailyStats } = this.props
        getDailyStats()
    }

    render(): ReactElement {
        const { list, isListRefreshing, getDailyStats } = this.props
        return (
            <View>
                <CurrencyList
                    isListRefreshing={isListRefreshing}
                    currencyList={list}
                    onRefresh={getDailyStats}
                    emptyMessage="Could not retrieve any data."
                />
            </View>
        )
    }
}

export default MainList
