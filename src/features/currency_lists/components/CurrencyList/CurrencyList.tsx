import React, { Component, ReactElement } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { SymbolCard, LastUpdatedText } from '..'
//Container-less card for the pre-loading placeholder
import { SearchBar } from 'react-native-elements'
import { SymbolCardBase } from '../SymbolCard'
import filterSymbolsList from '../../../../utilities/filterSymbolsList'

export interface OwnProps {
    currencyList: DailyStatsSymbol[]
    /** List has triggered a refresh and the request is being made */
    isListRefreshing: boolean
    onRefresh?: () => void
    lastUpdated: number | null
    emptyMessage: string
}

type Props = OwnProps

interface State {
    filteredList?: DailyStatsSymbol[]
    search: string
}

class CurrencyList extends Component<Props, State> {
    static defaultProps = {
        currencyList: [],
    }

    state: State = {
        search: '',
    }

    updateSearch = (search: string): void => {
        const { currencyList } = this.props

        if (!search.trim()) {
            this.setState({
                filteredList: undefined,
                search,
            })
        } else {
            const filteredList = currencyList.filter(filterSymbolsList(search))
            this.setState({ filteredList, search })
        }
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

        return <View style={styles.emptyContainer}>{comp}</View>
    }

    renderHeader = (): ReactElement => {
        const { lastUpdated } = this.props
        const { search } = this.state
        return (
            <>
                <LastUpdatedText lastUpdated={lastUpdated} />
                <SearchBar
                    placeholder="Search by symbol or name"
                    onChangeText={this.updateSearch}
                    value={search}
                    lightTheme
                />
            </>
        )
    }

    render(): ReactElement {
        const { currencyList, isListRefreshing, onRefresh } = this.props
        const { filteredList } = this.state
        return (
            <FlatList
                refreshing={isListRefreshing}
                data={filteredList || currencyList}
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

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
