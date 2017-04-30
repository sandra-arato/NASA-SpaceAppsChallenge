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
    if (this.props.daytime) {
      document.getElementsByTagName('body')[0].classList.remove('night');
    } else {
      document.getElementsByTagName('body')[0].classList.add('night');
    }
    return (
      <div className="Day">
        {this.renderChildren(this.props.testValue)}
      </div>

    );
  }
}

export default DayTimer;
