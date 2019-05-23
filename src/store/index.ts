import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import { offline } from '@redux-offline/redux-offline'
//Use default config as standard persistence is enough
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import rootReducer from './reducers'

//compose with empty options as redux-devtools and redux-offline have typescript typings mismatch
const compose = composeWithDevTools({})

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(logger),
        offline(offlineConfig)
    )
)

export default store
