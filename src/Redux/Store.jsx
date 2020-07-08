import { createStore, combineReducers } from 'redux'
import { appReducer } from '../Redux/Reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
    appReducer
})
const store = createStore(reducer, composeWithDevTools())

export default store