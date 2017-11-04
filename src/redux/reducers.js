import { combineReducers } from "redux"

import { STOP_LOADING } from './actions'

function loaders(state = {
 loading: true
}, action) {
 switch (action.type) {
   case STOP_LOADING:
     return Object.assign({}, state, {
       loading: action.loading
     })
   default: return state
 }
}

const reducers = combineReducers({
  loaders
})

export default reducers
