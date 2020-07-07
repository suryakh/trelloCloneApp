import { createStore, combineReducers } from 'redux'
import {appReducer} from '../Redux/Reducer'

const reducer = combineReducers({
    appReducer
})
const store = createStore(reducer)

export default store