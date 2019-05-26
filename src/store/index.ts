import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { AsyncStorage } from 'react-native'
import logger from 'redux-logger'
import { createOffline } from '@redux-offline/redux-offline'
import { persistStore, persistReducer } from 'redux-persist'
//Use default config as standard persistence is enough
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import { AppState as OfflineAppState } from '@redux-offline/redux-offline/lib/types'
import rootReducer from './reducers'
import { queue } from './offline'
//import { discard, effect } from './offline'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const {
    middleware: offlineMiddleware,
    enhanceReducer: offlineEnhanceReducer,
    enhanceStore: offlineEnhanceStore,
} = createOffline({
    ...offlineConfig,
    queue,
    //effect, discard,
    persist: (): false => false,
})

const persistedReducer = persistReducer(persistConfig, offlineEnhanceReducer(rootReducer))

const store = createStore(
    persistedReducer,
    composeWithDevTools(offlineEnhanceStore as any, applyMiddleware(offlineMiddleware, logger))
)

export const persistor = persistStore(store)
export default store

type RootReducerState = ReturnType<typeof rootReducer>

export type AppState = RootReducerState & OfflineAppState
