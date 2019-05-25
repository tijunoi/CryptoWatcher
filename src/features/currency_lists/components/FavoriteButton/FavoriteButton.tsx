import React, { ReactElement } from 'react'
import { StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { Icon } from 'react-native-elements'

interface OwnProps {
    favorite: boolean
    onPress: (newFavorite: boolean) => void
    style?: ButtonStyle
}

interface ButtonStyle {
    touchable?: StyleProp<ViewStyle>
    text?: StyleProp<TextStyle>
}

type Props = OwnProps

const FavoriteButton: React.FC<Props> = ({ onPress, favorite, style = {} }): ReactElement => {
    const options = favorite
        ? { text: texts.remove, icon: 'md-star' }
        : { text: texts.add, icon: 'md-star-outline' }

    return (
        <TouchableOpacity
            style={[styles.container, style.touchable]}
            onPress={(): void => {
                onPress(!favorite)
            }}>
            <Text style={[styles.text, style.text]}>{options.text}</Text>
            <Icon name={options.icon} type="ionicon" iconStyle={styles.icon} />
        </TouchableOpacity>
    )
}

export default FavoriteButton

//In absence of a better solution for texts
const texts = {
    add: 'ADD TO',
    remove: 'REMOVE',
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        overflow: 'hidden',
        //textAlignVertical: 'center',
        textAlign: 'center',
        paddingRight: 6,
    },
    container: {
        backgroundColor: '#3c95ff',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    icon: {
        color: 'white',
    },
})
