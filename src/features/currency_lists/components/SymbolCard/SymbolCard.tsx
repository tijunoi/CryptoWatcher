import React, { Component, ReactElement } from 'react'
import { View, Text, StyleSheet } from 'react-native'
//These libraries don't have typings available so ts can't get module information
// @ts-ignore
import Crypto from 'cryptocurrencies'
// @ts-ignore
import CryptoIcon from 'react-native-crypto-icons'
// @ts-ignore
import Icons from 'react-native-crypto-icons/lib/CryptoIconUnicodes'
// @ts-ignore
import Placeholder, { Line, Media } from 'rn-placeholder'
import FavoriteButton from '../FavoriteButton'
import { isUndefined } from '../../../../utilities/typeGuards'

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
    data?: DailyStatsSymbol
}

type Props = StoreProps & Partial<DispatchProps> & OwnProps

class SymbolCard extends Component<Props> {
    cryptoSymbol: string = ''
    cryptoName: string = ''

    constructor(props: Props) {
        super(props)
        if (props.data) {
            //Remove USDT from the symbol pair to get the crypto symbol
            this.cryptoSymbol = props.data.symbol.slice(0, -4)
            this.cryptoName = Crypto[this.cryptoSymbol] || this.cryptoSymbol
        }
    }

    dispatchFavorite = (newFavorite: boolean): void => {
        const { setFavorite, data } = this.props
        if (isUndefined(data)) return
        if (isUndefined(setFavorite)) return
        setFavorite(data && data.symbol, newFavorite)
    }

    renderCardContent = (): ReactElement | null => {
        const { data } = this.props
        if (isUndefined(data)) return null
        //Check if there is an icon for the symbol, otherwise apply BTC icon
        const iconExists = Icons[this.cryptoSymbol.toLowerCase()]

        const iconStyle = iconExists ? styles.cryptoIcon : styles.genericIcon
        const priceStyle =
            parseFloat(data.lastPrice) > parseFloat(data.weightedAvgPrice)
                ? styles.positiveChange
                : styles.negativeChange

        return (
            <>
                <View style={styles.firstRow}>
                    <CryptoIcon
                        name={iconExists ? this.cryptoSymbol.toLowerCase() : 'btc'}
                        style={iconStyle}
                    />
                    <Text style={styles.symbolNameText}>{`${this.cryptoSymbol} | ${
                        this.cryptoName
                    }`}</Text>
                    <Text style={[styles.priceText, priceStyle]}>
                        {parseFloat(data.lastPrice)}$
                    </Text>
                </View>
                <View style={styles.secondRow}>
                    <Text style={{ flex: 1 }}>Change: {parseFloat(data.priceChange)}$</Text>
                    <Text>Avg: {parseFloat(data.weightedAvgPrice)}$</Text>
                </View>
                <View style={styles.thirdRow}>
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
                <View style={styles.fourthRow}>
                    <FavoriteButton favorite={data.favorite} onPress={this.dispatchFavorite} />
                </View>
            </>
        )
    }

    render(): ReactElement {
        const { showPlaceholder } = this.props
        return (
            <View style={[styles.container, styles.card]}>
                <Placeholder
                    isReady={!showPlaceholder}
                    animation="fade"
                    whenReadyRender={this.renderCardContent}
                    renderLeft={(): ReactElement => <Media hasRadius />}>
                    <View style={{ height: 150 }}>
                        <Line width="70%" />
                        <Line />
                        <Line width="30%" />
                    </View>
                </Placeholder>
            </View>
        )
    }
}

export default SymbolCard

const styles = StyleSheet.create({
    cryptoIcon: {
        fontSize: 20,
        margin: 8,
        marginRight: 16,
        // to avoid extra font padding on android with cryptocoins font
        includeFontPadding: false,
    },
    genericIcon: {
        fontSize: 20,
        margin: 8,
        marginRight: 16,
        color: '#7d7d7d',
        // to avoid extra font padding on android with cryptocoins font
        includeFontPadding: false,
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
        backgroundColor: '#feffe1',
        borderRadius: 6,
        elevation: 4,
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
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 4,
        marginHorizontal: 8,
        height: 40,
    },
    symbolNameText: {
        flex: 1,
        fontWeight: 'bold',
    },
    priceText: {
        alignSelf: 'center',
        fontSize: 20,
    },
    secondRow: {
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    thirdRow: {
        margin: 4,
        marginBottom: 8,
        flexDirection: 'row',
    },
    fourthRow: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
})
