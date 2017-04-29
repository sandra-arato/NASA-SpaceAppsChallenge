import React, { Component } from 'react';
import DayTimer from './DayTimer.js';
import Sun from './Sun.js';
import meters from './meters.svg';
import gear from './gear.svg';
import house from './house.gif';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DayTimer daytime={true} testValue={"test"}>
          <Sun isItSun={true} />
        </DayTimer>
        <div className="location">
          <p>Perth</p>
          <p>29 April 2017</p>
        </div>
        <div id="clockItem" className="clock">
          <p>7:30 AM</p>
        </div>
        <div className="MeterContainer">
          <img src={meters} className="Meters" alt="meter" />
          <p>Yesterday's Usage: 2.2kW/h</p>
          <p>Tomorrow's Forecast: 2kW/h</p>
        </div>

        <img src={house} className="House" alt="house" />
        <footer className="Ground">
          <img src={gear} className="Settings" alt="settings" />
          <div className="container">
            <div className="loading">
              <div className="loading-bar"></div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
