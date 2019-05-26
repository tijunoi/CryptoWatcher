import { connect } from 'react-redux'
import { AppState } from '../../../../store'
import ConnectionStatus, { StoreProps } from './ConnectionStatus'
import { isDeviceOnline } from '../../redux/selectors'

const mapStateToProps = (state: AppState): StoreProps => ({
    online: isDeviceOnline(state),
})

export default connect<StoreProps, null, null, AppState>(mapStateToProps)(ConnectionStatus)
