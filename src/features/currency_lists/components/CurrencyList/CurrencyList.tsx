import React, { Component, ReactElement } from 'react'
import { FlatList, View, Text } from 'react-native'
import { SymbolCard } from '..'
// @ts-ignore
import Placeholder, { Line } from 'rn-placeholder'
import moment from 'moment'

export interface OwnProps {
    currencyList: DailyStatsSymbol[]
    /** List has triggered a refresh and the request is being made */
    isListRefreshing: boolean
    onRefresh?: () => void
    lastUpdated?: number
    emptyMessage: string
}

type Props = OwnProps
class CurrencyList extends Component<Props> {
    static defaultProps = {
        currencyList: [],
    }

    renderItem = ({ item }: { item: DailyStatsSymbol }): ReactElement => {
        return <SymbolCard data={item} />
    }

    renderEmptyPlaceholder = (): ReactElement[] | ReactElement => {
        const placeholders: ReactElement[] = []

        for (let i = 0; i < 10; i++) {
            placeholders.push(
                <Placeholder
                    isReady={false}
                    animation="fade"
                    renderRight={(): ReactElement => <Line />}>
                    <Line width="70%" />
                    <Line />
                    <Line width="30%" />
                </Placeholder>
            )
        }
        return placeholders
    }

    renderEmpty = (): ReactElement => {
        const { isListRefreshing, emptyMessage } = this.props
        const comp = isListRefreshing ? this.renderEmptyPlaceholder() : <Text>{emptyMessage}</Text>

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{comp}</View>
        )
    }

    renderHeader = (): ReactElement => {
        const { lastUpdated } = this.props
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 4 }}>
                <Text>Last updated: {moment(lastUpdated).fromNow()}</Text>
            </View>
        )
    }

    render(): ReactElement {
        const { currencyList, isListRefreshing, onRefresh } = this.props
        return (
            <FlatList
                refreshing={isListRefreshing}
                data={currencyList}
                onRefresh={onRefresh}
                renderItem={this.renderItem}
                keyExtractor={(item): string => item.symbol}
                ListEmptyComponent={this.renderEmpty}
                ListHeaderComponent={this.renderHeader}
            />
        )
    }
}

export default CurrencyList
