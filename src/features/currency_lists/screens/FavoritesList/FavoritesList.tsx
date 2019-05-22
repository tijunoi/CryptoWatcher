import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { NavigationDrawerScreenOptions } from 'react-navigation'

class FavoritesList extends Component {
    static navigationOptions: NavigationDrawerScreenOptions = {
        drawerLabel: 'Favorites',
    }

    render() {
        return (
            <View>
                <Text> Favorites list!!!</Text>
            </View>
        )
    }
}

export default FavoritesList
