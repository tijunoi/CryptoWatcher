import React, { PureComponent, ReactElement } from 'react'
import { Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import { NavigationFocusInjectedProps, NavigationParams } from 'react-navigation'
import Snackbar from 'react-native-snackbar'

export interface StoreProps {
    online: boolean
    isOfflineQueueEmpty: boolean
}

export interface DispatchProps {
    getDailyStats: () => void
}

type Props = StoreProps & DispatchProps & NavigationFocusInjectedProps

class ConnectionStatus extends PureComponent<Props> {
    componentDidUpdate(
        prevProps: Readonly<StoreProps & NavigationFocusInjectedProps<NavigationParams>>
    ): void {
        const { online, isFocused } = this.props
        if (online && prevProps.online !== online && isFocused) {
            this.showBackOnlineSnackbar()
        }
    }

    showBackOnlineSnackbar(): void {
        const { isOfflineQueueEmpty, getDailyStats } = this.props

        const action: Snackbar.Action = {
            title: 'REFRESH NOW',
            color: '#fffc5c',
            onPress: getDailyStats,
        }

        Snackbar.show({
            title: "You're online",
            duration: 5000,
            action: isOfflineQueueEmpty ? action : undefined,
        })
    }

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
