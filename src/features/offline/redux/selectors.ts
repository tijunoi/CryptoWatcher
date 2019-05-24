import { AppState } from '../../../store'

export const getBusy = (state: AppState): AppState['offline']['busy'] => state.offline.busy
export const isDeviceOnline = (state: AppState): AppState['offline']['online'] =>
    state.offline.online
