import React, { ReactElement } from 'react'
import { StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'

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
    return (
        <TouchableOpacity
            style={style.touchable}
            onPress={(): void => {
                onPress(!favorite)
            }}>
            <Text style={[styles.button, style.text]}>{favorite ? texts.remove : texts.add}</Text>
        </TouchableOpacity>
    )
}

export default FavoriteButton

//In absence of a better solution for texts
const texts = {
    add: 'Add to favorites',
    remove: 'Remove from favorites',
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3c95ff',
        borderRadius: 12,
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign: 'center',
    },
})
