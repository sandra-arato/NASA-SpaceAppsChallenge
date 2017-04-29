import React, { Component } from 'react';
import DayTimer from './DayTimer.js';
import Sun from './Sun.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DayTimer daytime={true} testValue={"test"}>
          <Sun isItSun={true} />
        </DayTimer>
        <footer className="Ground"></footer>
      </div>
    );
  }
}

export default App;
