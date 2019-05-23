import { createAppContainer } from 'react-navigation'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import appNavigator from './src/navigation/navigators'
import store from './src/store'

const AppContainer = createAppContainer(appNavigator)

//App may use lifecycle components so I leave it as class
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
    render(): React.ReactElement {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
}

export default App
