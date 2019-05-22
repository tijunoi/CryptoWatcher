import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { NavigationDrawerScreenOptions } from 'react-navigation'

class TopGainersList extends Component {
    static navigationOptions: NavigationDrawerScreenOptions = {
        drawerLabel: 'Top gainers',
    }

    render() {
        return (
            <View>
                <Text> MainList!!!</Text>
            </View>
        )
    }
}

export default TopGainersList
