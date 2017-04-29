import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sun from './sun.svg';
import moon from './moon.svg';
import './App.css';


class Sun extends Component {
  constructor(props) {
    super(props);

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
    var timerFn = that.requestInterval(function() {
      var now = new Date();
      milliseconds = now.getTime() - start.getTime();
      seconds = Math.ceil(milliseconds / 1000);
      console.log(seconds);

      // we should stop at the end of each cycle  - when sun reaches the ground
      if (seconds > 9) {
        that.clearRequestInterval(that.timer);
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
        return {coordinates: [seconds * 9, vertical]};
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
