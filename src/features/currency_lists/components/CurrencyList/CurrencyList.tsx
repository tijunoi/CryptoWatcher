import React, { Component, ReactElement } from 'react'
import { FlatList, View, Text } from 'react-native'
import { SymbolCard } from '..'
// @ts-ignore
import Placeholder, { Line } from 'rn-placeholder'

export interface OwnProps {
    currencyList: DailyStatsSymbol[]
    isListRefreshing: boolean
    onRefresh?: () => void
}

type Props = OwnProps
class CurrencyList extends Component<Props> {
    static defaultProps = {
        currencyList: [],
    }

    renderItem = ({ item }: { item: DailyStatsSymbol }): ReactElement => {
        return <SymbolCard data={item} />
    }

    renderEmptyPlaceholder = (): ReactElement[] => {
        const { isListRefreshing } = this.props
        const placeholders: ReactElement[] = []

        for (let i = 0; i < 10; i++) {
            placeholders.push(
                <Placeholder
                    isReady={!isListRefreshing}
                    animation="fade"
                    whenReadyRender={this.renderEmpty}
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
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Could not retrieve any data</Text>
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
                ListEmptyComponent={(): ReactElement => <>{this.renderEmptyPlaceholder()}</>}
                //ListEmptyComponent={this.renderEmpty}
            />
        )
    }
}

export default CurrencyList
