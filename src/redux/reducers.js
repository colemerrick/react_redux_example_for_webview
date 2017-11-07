import { combineReducers } from "redux"

import { SET_VALID_AUTH, USER_LOGIN, USER_AUTH,
         USER_LOGOUT } from './actions'

function valid_auth(state = {
 auth_state: ''
}, action) {
 switch (action.type) {
   case SET_VALID_AUTH:
     return Object.assign({}, state, {
       auth_state: action.auth_state
     })
   default: return state
 }
}

function user(state = {
  email: "",
  id: "",
  username: ""
}, action) {
  switch (action.type) {
    case USER_AUTH:
      return Object.assign({}, state, {
        email: action.payload.user.email,
        id: action.payload.user.id,
        username: action.payload.user.username
      })
    case USER_LOGIN:
      return Object.assign({}, state, {
        email: action.payload.user.email,
        id: action.payload.user.id,
        username: action.payload.user.username
      })
    case USER_LOGOUT:
      return Object.assign({}, state, {
        email: action.payload.user.email,
        id: action.payload.user.id,
        username: action.payload.user.username
      })
    default: return state
  }
}

const reducers = combineReducers({
  user,
  valid_auth
})

export default reducers
