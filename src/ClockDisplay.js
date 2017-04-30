import React, { Component } from 'react';
import * as data from './data.json';
import * as appls from './appliances.json';
import Bar from './Bar.js';
import './App.css';


class ClockDisplay extends Component {
  constructor(props) {
    super(props);

    var hourlyConsumption = [];

    var summa = 0;
    var total_kw = 0;

    for (var key in data) {
      var rooms =  data[key].appliances;
      // console.log(rooms);
      total_kw = 0;
      for (var room in rooms) {
        var cur = rooms[ room ];
        total_kw += cur.total_kw;
      }
      hourlyConsumption.push(total_kw);
    }

    var maxIs = Math.max.apply(null, hourlyConsumption);
    console.log('rooms', rooms, 'hourlyConsumption', hourlyConsumption);
    this.state = {
      value: props.value,
      time: '06:00',
      iterator: 5,
      solar: 0,
      battery: 0.8,
      usage: 0.5,
      topConsumption: maxIs,
      hourly: hourlyConsumption,
      grid: '',
      currentBattery: 0.2,
      currentSolar: 0.021,
      currentUsage: 0.4
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
    console.log('get');

    let iterator = that.state.iterator;
    let string = '00:00';
    let batteryLevel = this.state.battery;

    var timer = that.requestInterval(function() {
      if (!that.props.play) return;
      // var play =

      iterator = (iterator + 1) % 24;
      string = data[iterator].hour > 9 ? '' : '0';
      string = string +  data[iterator].hour + ':00';

      if (data && data[iterator]) {
        that.updateRooms(data[iterator].appliances);
        var solarPercentage = data[iterator].kw / data[13].kw;
        var usagePercentage = that.state.hourly[iterator] / that.state.topConsumption;

        var batteryLoadInHour = data[iterator].kw * 72 * 0.12 - that.state.hourly[iterator];
        var batteryPercentage = batteryLevel / 14;
        batteryLevel = Math.min(14, batteryLevel + batteryLoadInHour);
        if (batteryLevel > 0 && batteryPercentage !== 1) {
          if ( batteryLevel > 14 ) {
            batteryPercentage = 1;

          } else {
            document.getElementById('grid').className = 'loading-bar';
            document.getElementById('money').classList.remove('in');
            document.getElementById('money').classList.remove('out');
          }
        } else if ( batteryPercentage === 1 ) {
          batteryPercentage = batteryLevel < 14 ? batteryLevel / 14 : 1;
          // load the grid
          document.getElementById('grid').className = 'loading-bar in';
            document.getElementById('money').classList.add('in');
        } else {
          // use the grid
          batteryPercentage = batteryLevel > 0 ? batteryLevel /14  : 0;
            document.getElementById('grid').className = 'loading-bar out';
            document.getElementById('money').classList.add('out');

        }
        that.setState((prevState, props) => {
          return {
            time: string,
            solar: solarPercentage,
            usage: usagePercentage,
            battery: batteryPercentage,
            currentBattery: batteryLevel > 0 ? Math.ceil(batteryLevel * 100) /100 : 0,
            currentSolar: Math.ceil(data[iterator].kw * 100) /100 ,
            currentUsage: Math.ceil(that.state.hourly[iterator] * 100) /100,
         };
        });
      }

    }, 1000);

    that.timer = timer;
    try {
      that.timer();
    } catch(e) {
      // this is valid at 2:28AM.
      return;
    }

  }

  updateRooms(rooms) {

    var roomElements = document.querySelectorAll('.room');
    for (var re of roomElements) {
        re.classList.remove('show');
    }
    for (var room in rooms) {
        var roomElement = document.getElementById('house-' + room);
        roomElement.classList.add('show');
    }

  }

  componentDidMount() {
    this.getMorningTimestamp();
  }

  render() {
    // console.log('render',this.props.play);
    // if(!this.props.play) {
    //   this.getMorningTimestamp();
    // } else {
    //   this.clearRequestInterval(this.timer);
    // }
    return (
      <div className="ClockContainer" id="ClockController">
        <div id="clockItem" className="clock">
          <p>{this.state.time}</p>
        </div>
        <div className="Labels">
          <div className="BarLabel">
            <p>Energy Usage</p>
            <span id="usage-level">{this.state.currentUsage + ' kW/h'}</span>
          </div>
          <div className="BarLabel">
            <p>Input energy</p>
            <span id="energy-level">{this.state.currentSolar + ' kW/m2'}</span>
          </div>
          <div className="BarLabel">
            <p>Battery Level</p>
            <span id="battery-level">{this.state.currentBattery + ' kW/h'}</span>
          </div>
        </div>
        <Bar type="solar" percent={this.state.solar} />
        <Bar type="usage" percent={this.state.usage} />
        <Bar type="battery" percent={this.state.battery}  />

      </div>

    );
  }
}

export default ClockDisplay;
