import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { getDailyStatsList } from '../../redux/actions'
import { AppState } from '../../../../store'
import FavoritesList, { DispatchProps, StoreProps } from './FavoritesList'
import { isListRefreshing } from '../../../../store/selectors'
import { getFavorites, getLastUpdate } from '../../redux/selectors'
import { isDeviceOnline } from '../../../offline/redux/selectors'

const mapStateToProps = (state: AppState): StoreProps => ({
    isListRefreshing: isListRefreshing(state),
    list: getFavorites(state),
    online: isDeviceOnline(state),
    lastUpdated: getLastUpdate(state),
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    getDailyStats: (): void => {
        dispatch(getDailyStatsList())
    },
})

export default connect<StoreProps, DispatchProps, null, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(FavoritesList)
