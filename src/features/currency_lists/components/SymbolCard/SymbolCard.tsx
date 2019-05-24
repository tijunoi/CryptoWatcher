import React, { Component, ReactElement } from 'react'
import { View, Text } from 'react-native'
// @ts-ignore
import Placeholder, { Line } from 'rn-placeholder'

export interface StoreProps {
    showPlaceholder: boolean
}

export interface DispatchProps {
    setFavorite: (
        symbol: DailyStatsSymbol['symbol'],
        favorite: DailyStatsSymbol['favorite']
    ) => void
}

export interface OwnProps {
    data: DailyStatsSymbol
}

type Props = StoreProps & DispatchProps & OwnProps

class SymbolCard extends Component<Props> {
    renderCard(): ReactElement {
        const { data } = this.props
        return (
            <View>
                <Text>{data.symbol}</Text>
                <Text>{data.lastPrice}</Text>
            </View>
        )
    }

    render(): ReactElement {
        const { showPlaceholder } = this.props
        return (
            <Placeholder
                isReady={!showPlaceholder}
                animation="fade"
                whenReadyRender={this.renderCard()}
                renderRight={(): ReactElement => <Line />}>
                <Line width="70%" />
                <Line />
                <Line width="30%" />
            </Placeholder>
        )
    }
}

export default SymbolCard
