import React, { Component } from 'react';
import './App.css';


class Bar extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    var battery = Math.ceil(props.battery * 100) / 100;
    var solar = Math.ceil(props.solar * 100) / 100;
    var usage = Math.ceil(props.usage * 100) / 100;
    this.state = {
      battery: battery,
      solar: solar,
      usage: usage
    }
  }
  // shouldComponentUpdate() {
  //   console.log(this.props);
  //   return false;
  // }
  render() {
    var percentage = this.props.percent * 166;

    return (
      <div className="Bar">
        <div className={this.props.type + ' loading energy'}>
          <div className={this.props.type + ' loading-bar'}  style={{width : percentage}}></div>
        </div>
      </div>

    );
  }
}
export default Bar;
