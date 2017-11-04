import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from "react-redux"
import Actions from "./redux/actions"

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const props = this.props
    setTimeout(function(){
      props.dispatch(Actions.stopLoading(false))
    }, 1500);
  }

  loadingOrNot() {
    if (this.props.loaders.loading == true) {
      return (
        <p className="App-intro">
          STILL LOADING
        </p>
      );
    } else {
      return (
        <p className="App-intro">
          ALL DONE
        </p>
      );
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
  loaders: state.loaders
})

export default connect(mapStateToProps)(App)
