import React, { Component } from 'react';
import DayTimer from './DayTimer.js';
import ClockDisplay from './ClockDisplay.js';
import Sun from './Sun.js';
import meters from './meters.svg';
import gear from './gear.svg';
import car from './car.svg';
import earth from './earth.svg';
import money from './money.svg';
import house from './house.gif';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={car} className="Car" alt="car" />
        <img src={earth} className="Social" alt="Social" />
        <div className="Money">
          <img src={money} alt="Money" />
          <span>-$3.18</span>
        </div>

        <DayTimer daytime={true} testValue={"test"}>
          <Sun isItSun={true} />
        </DayTimer>
        <div className="location">
          <p>Perth</p>
          <p>29 April 2017</p>
        </div>
        <ClockDisplay />
        <div className="MeterContainer">
          <img src={meters} className="Meters" alt="meter" />
          <p>Yesterday's Usage: <span>2.2kW/h</span></p>
          <p>Tomorrow's Forecast: <span>2kW/h</span></p>
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
