import { createAppContainer } from 'react-navigation'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import appNavigator from './src/navigation/navigators'
import store, { persistor } from './src/store'

const AppContainer = createAppContainer(appNavigator)

//App may use lifecycle components so I leave it as class
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
    render(): React.ReactElement {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AppContainer />
                </PersistGate>
            </Provider>
        )
    }
}

export default App
