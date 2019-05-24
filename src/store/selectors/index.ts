import { createSelector } from 'reselect'
import { getLoading } from '../../features/currency_lists/redux/selectors'
import { getBusy } from '../../features/offline/redux/selectors'

// eslint-disable-next-line import/prefer-default-export
export const isListRefreshing = createSelector(
    getLoading,
    getBusy,
    (loading: boolean, busy: boolean): boolean => {
        return loading && busy
    }
)
