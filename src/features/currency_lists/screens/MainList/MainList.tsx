import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { NavigationDrawerScreenOptions } from 'react-navigation'

class MainList extends Component {
    static navigationOptions: NavigationDrawerScreenOptions = {
        drawerLabel: 'All currencies',
    }

    render() {
        return (
            <View>
                <Text> MainList!!!</Text>
            </View>
        )
    }
}

export default MainList
