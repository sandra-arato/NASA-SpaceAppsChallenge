import React, { Component } from 'react';
import DayTimer from './DayTimer.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DayTimer daytime={true} />
        <footer className="Ground"></footer>
      </div>
    );
  }
}

export default App;
