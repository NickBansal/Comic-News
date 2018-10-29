import React, { Component } from 'react';
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import { Router } from '@reach/router'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar />
      <Router>
        <Home path='/'/>
      </Router>

       
      </div>
    );
  }
}

export default App;
