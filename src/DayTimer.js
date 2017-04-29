import React, { Component } from 'react';
import sun from './sun.svg';
import moon from './moon.svg';
import './App.css';


class Sun extends Component {
  render() {
    let imgSrc = this.props.daytime ? sun : moon;
    let currentClassName = this.props.daytime ? "Sun-img" : "Moon-img";
    return (
      <div className="Sun">
        <img src={imgSrc} className={currentClassName} alt="Sun" />
      </div>
    );
  }
}

class DayTimer extends Component {
  animateSun() {
    console.log(this);
  };
  render() {
    this.animateSun();
    if (this.props.daytime) {
      document.getElementsByTagName('body')[0].className = '';
    } else {
      document.getElementsByTagName('body')[0].className = 'night';
    }
    return (
      <div className="Day">
        <Sun daytime={this.props.daytime} />
      </div>

    );
  }
}

export default DayTimer;
