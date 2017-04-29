import React, { Component } from 'react';
import './App.css';


class DayTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    // Bind the method to the component context
    this.renderChildren = this.renderChildren.bind(this);
  }

  changeHandler(value) {
    this.setState({
      value: value
    });
  }

  renderChildren() {
    return this.props.children
  }

  render() {
    console.log(this.props);
    if (this.props.daytime) {
      document.getElementsByTagName('body')[0].className = '';
    } else {
      document.getElementsByTagName('body')[0].className = 'night';
    }
    return (
      <div className="Day">
        {this.renderChildren(this.props.testValue)}
      </div>

    );
  }
}

export default DayTimer;
