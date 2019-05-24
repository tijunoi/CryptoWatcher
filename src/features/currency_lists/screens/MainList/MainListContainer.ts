import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { getDailyStatsList } from '../../redux/actions'
import { AppState } from '../../../../store'
import MainList, { DispatchProps, StoreProps } from './MainList'
import { isListRefreshing } from '../../../../store/selectors'
import { getUSDTSymbols } from '../../redux/selectors'
import { isDeviceOnline } from '../../../offline/redux/selectors'

const mapStateToProps = (state: AppState): StoreProps => ({
    isListRefreshing: isListRefreshing(state),
    list: getUSDTSymbols(state),
    online: isDeviceOnline(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getDailyStats: (): void => {
        dispatch(getDailyStatsList())
    },
})

export default connect<StoreProps, DispatchProps, null, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(MainList)
