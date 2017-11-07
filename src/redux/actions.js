const Actions = {}

export const SET_VALID_AUTH = "SET_VALID_AUTH"

export const USER_LOGIN = "USER_LOGIN"
export const USER_AUTH = "USER_AUTH"
export const USER_LOGOUT = "USER_LOGOUT"


Actions.setValidAuth = function setValidAuth(auth_state) {
  return {
    type: SET_VALID_AUTH,
    auth_state
  }
}

// BELOW WILL BE USED WHEN I RELOAD THE BROWSER
Actions.userAuth = function userAuth() {
  return dispatch => fetch(process.env.API_HOST + "/auth/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    }
  })
  .then((res) => { return res.json() })
  .then((res) => {
    dispatch({
      type: USER_AUTH,
      payload: {
        user: res.user
      }
    })
    dispatch(Actions.setValidAuth("yes"))
  })
  .catch((err) => {
    dispatch(Actions.setValidAuth("no"))
  })
}

Actions.userLogin = function userLogin(user) {
  return dispatch => fetch("https://hidden-mountain-64175.herokuapp.com" + "/user_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      /* For my rails 5 auth with knock */
      auth: {
        email: user.email,
        password: user.password
      }
    })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    /* If success, log the user in */
    localStorage.token = res.jwt.token
    /* Then send action to reducer */
    dispatch({
      type: USER_LOGIN,
      payload: {
        user: res.user
      }
    })
    dispatch(Actions.setValidAuth("yes"))
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.userLogout = function userLogout() {
  /* Log the user out */
  localStorage.token = ""
  /* Then send action to reducer */
  return dispatch => {
    dispatch({
      type: USER_LOGOUT,
      payload: {
        user: {
          email: "",
          id: "",
          username: ""
        }
      }
    })
    dispatch(Actions.setValidAuth("no"))
  }
}

export default Actions
