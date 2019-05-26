import { createSelector } from 'reselect'
import { AppState } from '../../../store'

export const getBusy = (state: AppState): AppState['offline']['busy'] => state.offline.busy
export const isDeviceOnline = (state: AppState): AppState['offline']['online'] =>
    state.offline.online

const getQueue = (state: AppState): AppState['offline']['outbox'] => state.offline.outbox
export const isQueueEmpty = createSelector(
    getQueue,
    (outbox): boolean => outbox.length === 0
)
