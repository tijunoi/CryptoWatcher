import { connect } from 'react-redux'
import { withNavigationFocus } from 'react-navigation'
import { Dispatch } from 'redux'
import { AppState } from '../../../../store'
import ConnectionStatus, { DispatchProps, StoreProps } from './ConnectionStatus'
import { isDeviceOnline, isQueueEmpty } from '../../redux/selectors'
import { getDailyStatsList } from '../../../currency_lists/redux/actions'

const mapStateToProps = (state: AppState): StoreProps => ({
    online: isDeviceOnline(state),
    isOfflineQueueEmpty: isQueueEmpty(state),
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    getDailyStats: (): void => {
        dispatch(getDailyStatsList())
    },
})

export default connect<StoreProps, DispatchProps, null, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(withNavigationFocus(ConnectionStatus))
