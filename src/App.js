import React, { Component } from 'react';
import DayTimer from './DayTimer.js';
import ClockDisplay from './ClockDisplay.js';
import Sun from './Sun.js';
import meters from './meters.svg';
import gear from './gear.svg';
import car from './car.svg';
import earth from './earth.svg';
import house from './house/house.png';
import houseBathroom from './house/house-bathroom.png';
import houseBedroom from './house/house-bedroom.png';
import houseHall from './house/house-hall.png';
import houseKitchen from './house/house-kitchen.png';
import houseLivingroom from './house/house-livingroom.png';
import houseStorage from './house/house-storage.png';
import houseStudy from './house/house-study.png';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false
    }
    this.pauseAnimation = this.pauseAnimation.bind(this);
  }
  pauseAnimation() {
    console.log('hello', this);
    var newState = !this.state.play;
    this.setState({
      play:newState
    });
    document.body.classList.remove(newState ? 'paused' : 'running');
    console.log(document.getElementsByClassName('SunMoon-img')[0]);
    document.getElementsByClassName('SunMoon-img')[0].classList.remove(newState ? 'paused' : 'running');
    document.body.classList.add(newState ? 'running' : 'paused');
    document.getElementsByClassName('SunMoon-img')[0].classList.add(newState ? 'running' : 'paused');

  }
  render() {
    return (
      <div className="App">
        <img src={car} className="Car" alt="car" />
        <img src={earth} className="Social" alt="Social" />
        <div className="Money">
        <svg id="money" fill="#f44727" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px"><title>Artboard 27</title><path d="M35.13,21,27.45,7.66a2.47,2.47,0,0,1,1.3-3.56l.73-.26A47.88,47.88,0,0,1,62,3.84l.73.26A2.47,2.47,0,0,1,64,7.66L56.16,21.24A22.75,22.75,0,0,1,35.13,21Zm26.69,6A30.53,30.53,0,0,1,45.9,31.48c-.64,0-1.29,0-1.93-.07a41.11,41.11,0,0,0,4,19.44,3.9,3.9,0,1,1-7,3.39,46.82,46.82,0,0,1-4.29-14.35,39.9,39.9,0,0,0-3.73,5,3.9,3.9,0,0,1-6.58-4.17A49.48,49.48,0,0,1,35.8,29.75a30.63,30.63,0,0,1-6-2.87C20.26,33.7,7.48,46.69,7.53,72.37A18.9,18.9,0,0,0,18.44,89.54a51.4,51.4,0,0,0,14.4,4.15,9.7,9.7,0,0,1-.18-1.78V75.35c0-7.21,7.75-12.45,18.43-12.45a25.18,25.18,0,0,1,11.5,2.52V54.07c0-6,5.44-10.68,13.47-12A52.49,52.49,0,0,0,61.82,27ZM81,48.58c-6.33,0-11.46,2.46-11.46,5.49v2.74c0,3,5.13,5.49,11.46,5.49s11.46-2.46,11.46-5.49V54.07C92.47,51,87.34,48.58,81,48.58ZM39.62,88v5.47c0,3,5.13,5.49,11.46,5.49s11.46-2.46,11.46-5.49V88a25.21,25.21,0,0,1-11.46,2.5A25.21,25.21,0,0,1,39.62,88ZM69.55,66.75v5.47c0,3,5.13,5.49,11.46,5.49s11.46-2.46,11.46-5.49V66.75A25.2,25.2,0,0,1,81,69.26,25.21,25.21,0,0,1,69.55,66.75ZM51.08,69.87c-6.33,0-11.46,2.46-11.46,5.49V78.1c0,3,5.13,5.49,11.46,5.49s11.46-2.46,11.46-5.49V75.35C62.55,72.32,57.42,69.87,51.08,69.87Zm18.46,12.3v5.47c0,3,5.13,5.49,11.46,5.49s11.46-2.46,11.46-5.49V82.17A25.2,25.2,0,0,1,81,84.67,25.21,25.21,0,0,1,69.55,82.17Z"/></svg>

          <span>+$3.18</span>
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
        </div>
        <img src={house} className="House" alt="house" />
        <img src={houseBathroom} className="House room" alt="house" id="house-bathroom"/>
        <img src={houseBedroom} className="House room" alt="house" id="house-bedroom"/>
        <img src={houseHall} className="House room" alt="house" id="house-hall"/>
        <img src={houseKitchen} className="House room" alt="house" id="house-kitchen"/>
        <img src={houseLivingroom} className="House room" alt="house" id="house-livingroom"/>
        <img src={houseStorage} className="House room" alt="house" id="house-storage"/>
        <img src={houseStudy} className="House room" alt="house" id="house-study"/>

        <footer className="Ground">
          <img src={gear} className="Settings" alt="settings" />
          <div className="container">
            <div className="loading">
              <div className="loading-bar" id="grid"></div>
            </div>
          </div>
          <button className="Play" onClick={this.pauseAnimation}>{this.state.play ? 'Pause' : 'Play'}</button>
        </footer>
      </div>
    );
  }
}

export default App;
