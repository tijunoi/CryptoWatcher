import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import * as screenNames from '../screenNames'
import { FavoritesList, MainList, TopGainersList } from '../../features/currency_lists/screens'

const appNavigator = createDrawerNavigator({
    [screenNames.MAIN]: createStackNavigator(
        { MainList },
        { navigationOptions: MainList.drawerNavigationOptions, headerLayoutPreset: 'center' }
    ),
    [screenNames.FAVORITES]: createStackNavigator(
        { FavoritesList },
        { navigationOptions: FavoritesList.drawerNavigationOptions, headerLayoutPreset: 'center' }
    ),
    [screenNames.TOP_GAINERS]: createStackNavigator(
        { TopGainersList },
        { navigationOptions: TopGainersList.drawerNavigationOptions, headerLayoutPreset: 'center' }
    ),
})

export default appNavigator
