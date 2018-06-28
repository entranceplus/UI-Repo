import React, { Component } from 'react';
import '../css/App.css';
import Login from '../components/Login';
import '../fontawesome-free-5.1.0-web/css/fontawesome.css';

class App extends Component {
  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default App;
