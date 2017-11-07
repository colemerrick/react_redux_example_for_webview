import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from "react-redux"
import Actions from "./redux/actions"

class App extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const props = this.props
    props.dispatch(Actions.userAuth())
  }

  handleSubmit(event) {
    /* prevent page reload */
    event.preventDefault()
    const user = {
      email: document.getElementById("email").value.toLowerCase(),
      password: document.getElementById("password").value
    }
    this.props.dispatch(Actions.userLogin(user))
    return false
  }

  loadingOrNot() {
    if (this.props.valid_auth.auth_state) {
      if (this.props.valid_auth.auth_state === "yes") {
        return (
          <p className="App-intro">
            LOGGED IN SUCCESSFULLY
          </p>
        );
      } else {
        return (
          <form on_submit={this.handleSubmit} auto_complete="on">
            <div className={style.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="on" />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="on" />
            </div>
            <input type="submit" value="Log in" />
          </form>
        );
      }
    } else {
      return (
        <p className="App-intro">
          LOADING
        </p>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        { this.loadingOrNot() }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  valid_auth: state.valid_auth
})

export default connect(mapStateToProps)(App)
