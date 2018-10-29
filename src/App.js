import React, { Component } from 'react';
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import NavbarOpen from './components/Navbar/NavbarOpen'
import { Router } from '@reach/router'
import * as api from './api'
import './App.css';

class App extends Component {

  state = {
    open: false,
    topics: [],
    chosenTopic: ''
  }


  render() {
    return (
      <div className="App">
      <Navbar 
      open={this.state.open} 
      changeBurgerMenu={this.changeBurgerMenu}/>
      
      {this.state.open && 
      <NavbarOpen 
      topics={this.state.topics}
      changeTopic={this.changeTopic}/>}
      
      <Router>
        <Home path='/'/>
      </Router>
      </div>
    );
  }

  changeBurgerMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

  changeTopic = (event) => {
    let chosenTopic = event
    console.log(chosenTopic)
    this.setState({
      chosenTopic
    })
  }

  componentDidMount() {
    api.getTopics()
    .then(topics => {
      this.setState({
        topics
      })
    })
  }

}

export default App;
