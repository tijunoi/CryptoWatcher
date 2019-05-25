import { StyleSheet, Text, View } from 'react-native'
import React, { FC, ReactElement, useState } from 'react'
import moment from 'moment'
import { useInterval } from '../../../../utilities/hooks'

interface OwnProps {
    /** Timestamp */
    lastUpdated: number | null
}

type Props = OwnProps

const LastUpdatedText: FC<Props> = ({ lastUpdated }): ReactElement => {
    const [lastUpdateText, setLastUpdateText] = useState(
        lastUpdated ? moment(lastUpdated).fromNow() : 'never'
    )

    //Update text every second
    useInterval((): void => {
        setLastUpdateText(lastUpdated ? moment(lastUpdated).fromNow() : 'never')
    }, 10000)

    return (
        <View style={styles.container}>
            <Text>Last updated: {lastUpdateText}</Text>
        </View>
    )
}

export default LastUpdatedText

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 4,
    },
})
