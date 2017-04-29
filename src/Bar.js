import React, { Component } from 'react';
import './App.css';


class Bar extends Component {
  constructor(props) {
    super(props);
  }

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
