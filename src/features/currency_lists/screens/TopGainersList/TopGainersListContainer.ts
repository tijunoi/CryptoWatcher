import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { getDailyStatsList } from '../../redux/actions'
import { AppState } from '../../../../store'
import TopGainersList, { DispatchProps, StoreProps } from './TopGainersList'
import { isListRefreshing } from '../../../../store/selectors'
import { getTopGainers } from '../../redux/selectors'
import { isDeviceOnline } from '../../../offline/redux/selectors'

const mapStateToProps = (state: AppState): StoreProps => ({
    isListRefreshing: isListRefreshing(state),
    list: getTopGainers(state),
    online: isDeviceOnline(state),
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    getDailyStats: (): void => {
        dispatch(getDailyStatsList())
    },
})

export default connect<StoreProps, DispatchProps, null, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(TopGainersList)
