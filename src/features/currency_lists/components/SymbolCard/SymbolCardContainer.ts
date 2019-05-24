import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import SymbolCard, { OwnProps, DispatchProps, StoreProps } from './SymbolCard'
import { isListRefreshing } from '../../../../store/selectors'
import { AppState } from '../../../../store'
import { setFavoriteSymbol } from '../../redux/actions'

const mapStateToProps = (state: AppState): StoreProps => ({
    showPlaceholder: isListRefreshing(state),
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    setFavorite: (symbol, favorite): void => {
        dispatch(setFavoriteSymbol(symbol, favorite))
    },
})

export default connect<StoreProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(SymbolCard)
