import { CombinedState, combineReducers } from 'redux'
import auth from './authReducer'

export default combineReducers({
    auth,
})
