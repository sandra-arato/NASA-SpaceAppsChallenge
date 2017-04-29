import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sun_moon from './sun_moon_rotation.svg';
import './App.css';


class Sun extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      coordinates: [-10, 75]
    };
  }

  getInitialState(){
    return {
      timer: () => {},
      coordinates: [-10, 75]
    }
  }

  render() {

    return (<img src={sun_moon} className="SunMoon-img" alt="Sun Moon"/>);
  }
}

Sun.propTypes = {
  testValue: PropTypes.string
}

export default Sun;
