import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { selectStep } from './utils/selectors'
import { errorPage, insertBattery, pullBattery } from './features/stepReducer';
import SocketToSteps from './webSocket/SocketToSteps';


function Debug() {

  const step = useSelector(selectStep());

  const code = process.env.REACT_APP_DEBUG
  if (code !== 'production') {
    return (
      <Row className="Debug">
        <Col>Step: {JSON.stringify(step)}</Col>
        <Col><DebugButton /></Col>
        <Col><ErrorButton /></Col>
      </Row>
    )
  }
}

function ErrorButton() {
  const step = useSelector(selectStep());
  const dispatch = useDispatch();
  switch (step) {
    case 'wait-for-swap':
      return (
        <div>
          <button onClick={() => dispatch(errorPage('station-reboot'))}>Station reboot</button>
          <button onClick={() => dispatch(errorPage('no-battery-available'))}>No BMS available</button>
          <button onClick={() => dispatch(errorPage('charging-station'))}>Charging Station</button>
        </div>
      ) 
    case 'insert-battery':
      return (
        <div>
          <button onClick={() => dispatch(errorPage('no-battery-inserted'))}>No BMS inserted</button>
          <button onClick={() => dispatch(errorPage('bms-not-recognized'))}>No BMS detected</button>
        </div>
      )
    case 'pull-battery':
      return <button onClick={() => dispatch(errorPage('no-battery-collected'))}>No BMS collected</button>
    default:
      return null;
  }
}

function DebugButton() {
  const step = useSelector(selectStep());
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


// const Step = () => {
  
//   // return <span>{step}</span>
// }

class App extends React.Component {
  
  // const store = useStore()

  // ws = new WS();
  // constructor(props) { 
  //   super(props);
  // }

  componentDidMount() {
    // this.ws.connect();
  }

  render() {
    return (
      <Container fluid className="App h-100 w-100 p-0">
        < Debug/>
        <Row className='h-100 m-0'>
          <SocketToSteps />
        </Row>
      </Container>
    ) 
  }
}

export default App;
