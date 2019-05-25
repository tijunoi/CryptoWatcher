import React, { Component, ReactElement } from 'react'
import { FlatList, View, Text } from 'react-native'
import { SymbolCard, LastUpdatedText } from '..'
//Container-less card for the pre-loading placeholder
import { SymbolCardBase } from '../SymbolCard'

export interface OwnProps {
    currencyList: DailyStatsSymbol[]
    /** List has triggered a refresh and the request is being made */
    isListRefreshing: boolean
    onRefresh?: () => void
    lastUpdated: number | null
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

    renderEmptyPlaceholder = (): ReactElement[] => {
        const placeholders: ReactElement[] = []

        for (let i = 0; i < 5; i++) {
            placeholders.push(<SymbolCardBase showPlaceholder key={i} />)
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

    render(): ReactElement {
        const { currencyList, isListRefreshing, onRefresh, lastUpdated } = this.props
        return (
            <FlatList
                refreshing={isListRefreshing}
                data={currencyList}
                onRefresh={onRefresh}
                renderItem={this.renderItem}
                keyExtractor={(item): string => item.symbol}
                ListEmptyComponent={this.renderEmpty}
                ListHeaderComponent={(): ReactElement => (
                    <LastUpdatedText lastUpdated={lastUpdated} />
                )}
            />
        )
    }
}

export default CurrencyList
