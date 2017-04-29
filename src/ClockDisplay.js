import React, { Component } from 'react';
import * as data from './data.json';
import './App.css';


class ClockDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      time: '06:00',
      iterator: 5
    };

    /*!
     * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
     * modified gist.github.com/joelambert/1002116
     * the fallback function requestAnimFrame is incorporated
     * gist.github.com/joelambert/1002116
     * gist.github.com/englishextra/873c8f78bfda7cafc905f48a963df07b
     * jsfiddle.net/englishextra/sxrzktkz/
     * @param {Object} fn The callback function
     * @param {Int} delay The delay in milliseconds
     * requestInterval(fn, delay);
     */
    this.requestInterval = function (fn, delay) {
    	var requestAnimFrame = (function () {
    		return window.requestAnimationFrame || function (callback, element) {
    			window.setTimeout(callback, 1000 / 60);
    		};
    	})(),
    	start = new Date().getTime(),
    	handle = {};
    	function loop() {
    		handle.value = requestAnimFrame(loop);
    		var current = new Date().getTime(),
    		delta = current - start;
    		if (delta >= delay) {
    			fn.call();
    			start = new Date().getTime();
    		}
    	}
    	handle.value = requestAnimFrame(loop);
    	return handle;
    };
    /*!
     * Behaves the same as clearInterval except uses cancelRequestAnimationFrame()
     * where possible for better performance
     * gist.github.com/joelambert/1002116
     * gist.github.com/englishextra/873c8f78bfda7cafc905f48a963df07b
     * jsfiddle.net/englishextra/sxrzktkz/
     * @param {Int|Object} handle function handle, or function
     * clearRequestInterval(handle);
     */
    this.clearRequestInterval = function (handle) {
    	if (window.cancelAnimationFrame) {
    		window.cancelAnimationFrame(handle.value);
    	} else {
    		window.clearInterval(handle);
    	}
    };
    /*!
     * Behaves the same as setTimeout except uses requestAnimationFrame()
     * where possible for better performance
     * modified gist.github.com/joelambert/1002116
     * the fallback function requestAnimFrame is incorporated
     * gist.github.com/joelambert/1002116
     * gist.github.com/englishextra/873c8f78bfda7cafc905f48a963df07b
     * jsfiddle.net/englishextra/dnyomc4j/
     * @param {Object} fn The callback function
     * @param {Int} delay The delay in milliseconds
     * requestTimeout(fn,delay);
     */
    this.requestTimeout = function (fn, delay) {
    	var requestAnimFrame = (function () {
    		return window.requestAnimationFrame || function (callback, element) {
    			window.setTimeout(callback, 1000 / 60);
    		};
    	})(),
    	start = new Date().getTime(),
    	handle = {};
    	function loop() {
    		var current = new Date().getTime(),
    		delta = current - start;
    		if (delta >= delay) {
    			fn.call();
    		} else {
    			handle.value = requestAnimFrame(loop);
    		}
    	}
    	handle.value = requestAnimFrame(loop);
    	return handle;
    };
    /*!
     * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame()
     * where possible for better performance
     * gist.github.com/joelambert/1002116
     * gist.github.com/englishextra/873c8f78bfda7cafc905f48a963df07b
     * jsfiddle.net/englishextra/dnyomc4j/
     * @param {Int|Object} handle The callback function
     * clearRequestTimeout(handle);
     */
    this.clearRequestTimeout = function (handle) {
    	if (window.cancelAnimationFrame) {
    		window.cancelAnimationFrame(handle.value);
    	} else {
    		window.clearTimeout(handle);
    	}
    };

    // Bind the method to the component context
  }

  changeHandler(value) {
    this.setState({
      value: value
    });
  }

  getMorningTimestamp() {
    var that = this;
    let iterator = that.state.iterator;
    let string = '00:00';

    var timer = that.requestInterval(function() {
      iterator = (iterator + 1) % 24;
      string = data[iterator].hour > 9 ? '' : '0';
      string = string +  data[iterator].hour + ':00';

      that.setState((prevState, props) => {
        return {time: string };
      });
    }, 1000);

    that.timer = timer;
    try {
      that.timer();
    } catch(e) {
      // this is valid at 2:28AM.
      return;
    }

  }

  componentDidMount() {
    this.getMorningTimestamp();
  }

  render() {
    return (
      <div id="clockItem" className="clock">
        <p>{this.state.time}</p>
      </div>
    );
  }
}

export default ClockDisplay;
