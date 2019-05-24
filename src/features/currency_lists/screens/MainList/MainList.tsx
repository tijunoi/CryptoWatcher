import React, { Component, ReactElement } from 'react'
import { View, Text } from 'react-native'
import { NavigationDrawerScreenOptions } from 'react-navigation'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { getDailyStatsList } from '../../redux/actions'

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getDailyStats: (): void => {
        dispatch(getDailyStatsList())
    },
})

type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = DispatchProps

class MainList extends Component<Props> {
    static navigationOptions: NavigationDrawerScreenOptions = {
        drawerLabel: 'All currencies',
    }

    componentDidMount(): void {
        const { getDailyStats } = this.props
        getDailyStats()
    }

    render(): ReactElement {
        return (
            <View>
                <Text> MainList!!!</Text>
            </View>
        )
    }
}

export default connect<{}, DispatchProps>(
    null,
    mapDispatchToProps
)(MainList)
