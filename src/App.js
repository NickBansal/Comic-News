import React, { Component } from 'react';
import Home from './components/Home/Home'
import * as api from './api'
import './App.css';

class App extends Component {

  state = {
    switch: true,
    topics: [],
  }

  render() {

    return (
      <div className="App">
        <Home 
        changeTopic={this.changeTopic}
        switchTelevision={this.switchTelevision}
        open={this.state.open}
        switch={this.state.switch}
        chosenTopic={this.state.chosenTopic} 
        topics={this.state.topics}/>
      </div>
    );
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
