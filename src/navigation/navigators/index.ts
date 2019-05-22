import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import * as screenNames from '../screenNames'
import { FavoritesList, MainList, TopGainersList } from '../../features/currency_lists/screens'

const appNavigator = createDrawerNavigator({
    [screenNames.MAIN]: createStackNavigator({ MainList }),
    [screenNames.FAVORITES]: FavoritesList,
    [screenNames.TOP_GAINERS]: TopGainersList,
})

export default appNavigator
