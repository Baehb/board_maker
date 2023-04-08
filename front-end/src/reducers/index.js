import { combineReducers } from 'redux'
import signUpStore from './signUpStore'

// 등록
const rootReducer = combineReducers({
  signUp: signUpStore,
})

export default rootReducer
