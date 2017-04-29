import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sun from './sun.svg';
import moon from './moon.svg';
import './App.css';


class Sun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      coordinates: [0, 100]
    };
  }

  getInitialState(){
    return {
      timer: () => {},
      coordinates: [0, 100]
    }
  }

  animate() {
    // this function moves the sun along the given coordinates
    // TODO: animate fn should take a parameter that gives the length of the animation
    // then animation should update smoothly in n steps - based on number of data points
    var that = this;
    var start = new Date();
    var milliseconds = 0;
    var seconds = 0;
    // this timer updates the coordinates over time
    var timerFn = setInterval(function() {
      var now = new Date();
      milliseconds = now.getTime() - start.getTime();
      seconds = Math.ceil(milliseconds / 1000);
      console.log(seconds);

      // we should stop at the end of each cycle  - when sun reaches the ground
      if (seconds > 9) {
        clearInterval(that.timer);
      }

      // update component state with new coordinates
      that.setState((prevState, props) => {
        let vertical = 0;
        // vertical coordinate should only increase till midday
        if (seconds < 5 ) {
          vertical = 80 - 7*seconds;
        } else {
          vertical = 7.8*seconds;
        }

        // TODO: x should be between 2 and 80, y shoudl be between 20 and 60
        return {coordinates: [seconds * 8, vertical]};
      });

    }, 1000);

    that.timer = timerFn;
    that.timer();
  }

  componentDidMount() {
    clearInterval(this.timer);
    this.animate();
  }

  render() {
    let imgSrc = this.props.isItSun ? sun : moon;
    let currentClassName = this.props.isItSun ? "Sun-img" : "Moon-img";
    let left = this.state.coordinates[0] + 'vw';
    let top = this.state.coordinates[1] + 'vh';
    return (<img src={imgSrc} className={currentClassName} alt="Sun" style={{left: left, top: top }}/>);
  }
}

Sun.propTypes = {
  testValue: PropTypes.string
}

export default Sun;
