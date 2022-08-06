import './App.css';
import React from 'react';
import { WaitForSwap } from './WaitForSwap'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      ws: null,
      connected: false,
      step: "startup-ongoing"
    }

    this.toogle_cb = this.toogle_cb.bind(this)
    this.connect = this.connect.bind(this)
  }

  componentDidMount() {
    this.connect();
  }

  timeout = 250; // Initial timeout duration as a class variable

  /**
   * @function connect
   * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
   */
  connect = () => {
    var ws = new WebSocket("ws://localhost:8080");
    let that = this; // cache the this
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
      console.log("connected websocket main component");

      this.setState({ ws: ws, connected: true });

      that.timeout = 250; // reset timer to 250 on open of websocket connection 
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const { slot, key, value } = JSON.parse(evt.data)
      console.log(JSON.stringify({ slot, key, value }));
      this.setState({ [key]: value })
      // window[`Slot${slot}`].setState({ [key]: value })
    }

    // websocket onclose event listener
    ws.onclose = e => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000
        )} second.`,
        e.reason
      );
      this.setState({ connected: false })
      that.timeout = that.timeout + that.timeout; //increment retry interval
      connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );

      ws.close();
    };
  };

  toogle_cb(slot, command, value) {
    console.log(slot, command, value);
    this.state.ws.send(JSON.stringify({ slot, command, value }))
    return true
  }

  /**
   * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
   */
  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };

  step_rendering() {
    switch (this.state.step) {
      case 'wait-for-swap':
        return <WaitForSwap />
    }
  }

  render() {
    return (
      <div>
        <div className="Debug">
          WS connected: {this.state.connected ? "true" : "false"}
        </div>
        {this.step_rendering()}
      </div>
    )
  }
}

export default App;
