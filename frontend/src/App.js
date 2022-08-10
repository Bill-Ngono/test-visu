import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Steps } from './Steps/Steps';


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      ws: null,
      connected: false,
      step: "startup-ongoing"
    }
    this.insertSuccess = this.insertSuccess.bind(this)
    this.collectSuccess = this.collectSuccess.bind(this)
    this.swapCompleted = this.swapCompleted.bind(this)
    this.errorPage = this.errorPage.bind(this)
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

  /**
   * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
   */
  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };

  debug_step_rendering() {
    switch (this.state.step) {
      case 'wait-for-swap':
        return <div>
          <button onClick={() => { this.setState({ step: "insert-battery" }) }}>Begin Swap</button>
        </div>
      case 'insert-battery':
        return <div>
          <button onClick={() => { this.setState({ step: "insert-battery", battery_inserted: true }) }}>Insert battery</button>
        </div>
      case 'pull-battery':
        return <div>
          <button onClick={() => { this.setState({ step: "swap-completed", battery_collected: 99 }) }}>Get battery</button>
        </div>
      default:
        return null
    }
  }

  errorPage() {
    this.setState({ step: "error-page" })
  }

  insertSuccess() {
    this.setState({ step: "pull-battery" })
  }

  collectSuccess() {
    this.setState({ step: "swap-completed" })
  }

  swapCompleted() {
    this.setState({ step: "wait-for-swap" })
  }

  render() {
    return (
      <Container className="App h-100 w-100">
        <Row className="Debug">
          <Col>WS connected: {this.state.connected ? "true" : "false"}</Col>
          <Col>Step: {this.state.step}</Col>
          <Col>{this.debug_step_rendering()}</Col>
        </Row>
        <Row className='h-100'>
          <Steps battery_inserted={this.state.battery_inserted} battery_collected={this.state.battery_collected} step={this.state.step} insertSuccess={this.insertSuccess} collectSuccess={ this.collectSuccess } errorPage={this.errorPage} swapCompleted={this.swapCompleted} />          
        </Row>
      </Container>
    )
  }
}

export default App;
