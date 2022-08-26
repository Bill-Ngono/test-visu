import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { insertBattery, pullBattery, selectStep } from './features/goToPage';
import { Steps } from './Steps/Steps';


function Debug() {
  const code = process.env.REACT_APP_NOT_SECRET_CODE
  if (code !== 'production') {
    return (
      <Row className="Debug">
        {/* <Col>WS connected: {this.state.connected ? "true" : "false"}</Col> */}
        <Col>Step: <Step /></Col>
        <Col><DebugButton /></Col>
      </Row>
    )
  }
}

function DebugButton() {
  const step = useSelector(selectStep);
  const dispatch = useDispatch();
  switch (step) {
    case 'wait-for-swap':
      return <div>
        <button onClick={() => dispatch(insertBattery(false))}>Begin Swap</button>
      </div>
    case 'insert-battery':
      return <div>
        <button onClick={() => dispatch(insertBattery(true))}>Insert battery</button>
      </div>
    case 'pull-battery':
      return <div>
        <button onClick={() => dispatch(pullBattery(true))}>Get battery</button>
      </div>
    default:
      return null
  }
}

function Step() {
  const step = useSelector(selectStep);
  return <span>{step}</span>
}

class App extends React.Component {

  // componentDidMount() {
  //   this.connect();
  // }

  render() {
    return (
      <Container className="App h-100 w-100">
        < Debug />
        <Row className='h-100'>
          <Steps />
        </Row>
      </Container>
    )
  }
}

export default App;
