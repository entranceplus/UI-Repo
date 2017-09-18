import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import Login from '../components/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome</h2>
        </div>
        <Login />
      </div>
    );
  }
}

export default App;
