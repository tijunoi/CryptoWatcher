import React, { Component, ReactElement } from 'react'
import { View, Text, StyleSheet } from 'react-native'
// @ts-ignore
import Crypto from 'cryptocurrencies'
// @ts-ignore
import CryptoIcon from 'react-native-crypto-icons'
// @ts-ignore
import Icons from 'react-native-crypto-icons/lib/CryptoIconUnicodes'
// @ts-ignore
import Placeholder, { Line, Media } from 'rn-placeholder'
import FavoriteButton from '../FavoriteButton'

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
    cryptoSymbol: string
    cryptoName: string

    constructor(props: Props) {
        super(props)
        //Remove USDT from the symbol pair to get the crypto symbol
        this.cryptoSymbol = props.data.symbol.slice(0, -4)
        this.cryptoName = Crypto[this.cryptoSymbol] || this.cryptoSymbol
    }

    renderCard = (): ReactElement => {
        const { data } = this.props

        const iconExists = Icons[this.cryptoSymbol.toLowerCase()]
        const iconStyle = iconExists ? styles.cryptoIcon : styles.genericIcon
        const priceStyle =
            parseFloat(data.lastPrice) > parseFloat(data.weightedAvgPrice)
                ? styles.positiveChange
                : styles.negativeChange

        return (
            <View style={[styles.container, styles.card]}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flex: 1,
                        marginVertical: 12,
                        marginHorizontal: 8,
                    }}>
                    <CryptoIcon
                        name={iconExists ? this.cryptoSymbol.toLowerCase() : 'btc'}
                        style={iconStyle}
                    />
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{`${this.cryptoSymbol} | ${
                        this.cryptoName
                    }`}</Text>
                    <Text style={[{ alignSelf: 'center', fontSize: 20 }, priceStyle]}>
                        {parseFloat(data.lastPrice)}$
                    </Text>
                </View>
                <View style={{ margin: 4, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ flex: 1 }}>Change: {parseFloat(data.priceChange)}$</Text>
                    <Text>Avg: {parseFloat(data.weightedAvgPrice)}$</Text>
                </View>
                <View style={{ margin: 4, marginBottom: 8, flexDirection: 'row' }}>
                    <Text>
                        24h:{' '}
                        <Text
                            style={
                                parseFloat(data.priceChangePercent) > 0
                                    ? styles.positiveChange
                                    : styles.negativeChange
                            }>
                            {data.priceChangePercent}%
                        </Text>
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                    <FavoriteButton favorite={data.favorite} onPress={this.dispatchFavorite} />
                </View>
            </View>
        )
    }

    dispatchFavorite = (newFavorite: boolean): void => {
        const { setFavorite, data } = this.props
        setFavorite(data.symbol, newFavorite)
    }

    render(): ReactElement {
        const { showPlaceholder } = this.props
        return (
            <Placeholder
                isReady={!showPlaceholder}
                animation="fade"
                whenReadyRender={this.renderCard}
                renderLeft={(): ReactElement => <Media hasRadius />}>
                <Line width="70%" />
                <Line />
                <Line width="30%" />
            </Placeholder>
        )
    }
}

export default SymbolCard

const styles = StyleSheet.create({
    cryptoIcon: {
        fontSize: 20,
        margin: 8,
        marginRight: 16,
    },
    genericIcon: {
        fontSize: 20,
        margin: 8,
        marginRight: 16,
        color: '#505050',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        justifyContent: 'flex-start',
        margin: 5,
    },
    card: {
        padding: 8,
        backgroundColor: '#ffebd0',
        borderRadius: 6,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0.3,
        },
    },
    positiveChange: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#149432',
    },
    negativeChange: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#94141a',
    },
})
