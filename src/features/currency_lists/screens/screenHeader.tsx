import { NavigationScreenProps, NavigationStackScreenOptions } from 'react-navigation'
import { Icon } from 'react-native-elements'
import React from 'react'
import { StyleSheet } from 'react-native'

// eslint-disable-next-line import/prefer-default-export
export const createScreenHeaderOptions = (
    { navigation }: NavigationScreenProps,
    headerTitle: string
): NavigationStackScreenOptions => ({
    // headerTitleStyle: { width: '100%', textAlign: 'center'},
    title: headerTitle,
    headerLeft: (
        <Icon
            name="md-menu"
            type="ionicon"
            containerStyle={styles.icon}
            onPress={(): void => navigation.toggleDrawer()}
        />
    ),
})

const styles = StyleSheet.create({
    icon: {
        marginLeft: 16,
    },
})
