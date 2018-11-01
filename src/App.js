import React, { Component } from 'react';
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import NavbarOpen from './components/Navbar/NavbarOpen';
import * as api from './api'
import './App.css';

class App extends Component {

  state = {
    switch: true,
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
        
        <Home 
        path="/"
        switchTelevision={this.switchTelevision}
        open={this.state.open}
        switch={this.state.switch}
        chosenTopic={this.state.chosenTopic} />

      </div>
    );
  }

  changeBurgerMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

  switchTelevision = () => {
    this.setState({
      switch: !this.state.switch
    })
  }

  changeTopic = (event) => {
    let chosenTopic = event.toLowerCase()
    this.setState({
      chosenTopic,
      open: false
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
