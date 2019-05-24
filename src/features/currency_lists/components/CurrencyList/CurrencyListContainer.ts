import { connect } from 'react-redux'
import CurrencyList, { OwnProps, StoreProps } from './CurrencyList'
import { isListRefreshing } from '../../../../store/selectors'
import { AppState } from '../../../../store'

const mapStateToProps = (state: AppState): StoreProps => ({
    isListRefreshing: isListRefreshing(state),
})

export default connect<StoreProps, null, OwnProps, AppState>(mapStateToProps)(CurrencyList)
