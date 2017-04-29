import React, { Component } from 'react';
import * as data from './data.json';
import './App.css';


class ClockDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      time: '6:00 AM',
      iterator: 6
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
    let iterator = 12;
    let timeText = '';

    // for (var i = 12; i > -6; i--) {
    //
    //   for (var j = 0; i < 2; j++) {
    //     if (i > 0) {
    //
    //     } else {
    //
    //     }
    //
    //     let daytime = j > 0 ? ' AM' : ' PM';
    //
    //   }
    //
    //
    // }

    var timerFn = that.requestInterval(function() {
      console.log('iterator', iterator);
      if (iterator > 12 || iterator < 6) {
        that.clearRequestInterval(that.timer);
      }
      console.log(that.state.time);
      // that.updateHours(iterator);
      iterator--;
    }, 2000);
    that.timer = timerFn;
    return timeText;
  }

  updateHours(i) {
    var that = this;
    if (i< 0 && that.timer) {
      that.clearRequestInterval(that.timer);
    }

    this.setState((prevState, props) => {
      const timestamp = data[i].timestamp;
      var date = new Date(timestamp * 1000);
      console.log(date);
      return {
        time: date.getHours() + ':' + '' + date.getMinutes(),
      };
    });
  }

  componentDidMount() {
    clearInterval(this.timer);
    this.getMorningTimestamp();

  }

  render() {
    let test = (data);
    console.log(test);
    this.getMorningTimestamp();
    return (
      <div id="clockItem" className="clock">
        <p>7:30 AM</p>
      </div>
    );
  }
}

export default ClockDisplay;
