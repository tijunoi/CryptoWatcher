import React, { PureComponent, ReactElement } from 'react'
import { Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native'

export interface StoreProps {
    online: boolean
}

type Props = StoreProps

class ConnectionStatus extends PureComponent<Props> {
    render(): ReactElement | null {
        const { online } = this.props
        return online ? null : (
            <Icon
                name="cloud-off"
                size={14}
                color="red"
                containerStyle={styles.container}
                raised
                reverse
            />
        )
    }
}

export default ConnectionStatus

const styles = StyleSheet.create({
    container: {
        marginRight: 4,
    },
})
