import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { WaitForSwap } from './WaitForSwap'
import { StartupOngoing } from './StartupOngoing'
import { InsertBattery } from './Swap/InsertBattery';
import { CollectBattery } from './Swap/PullBattery';
import { SwapCompleted } from './Swap/SwapCompleted';
import { EasterEgg } from './EasterEgg';
import React from 'react';

export class Steps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: props.step,
            battery_inserted: props.battery_inserted,
            battery_collected: props.battery_collected,
        }
    }

    render() {
        let step;
        switch (this.props.step) {
            case 'wait-for-swap':
                this.setState({ battery_inserted: false, battery_collected: false })
                step = <WaitForSwap />
                break;
            case 'insert-battery':
                step = <InsertBattery success={this.props.battery_inserted} successCb={this.props.insertSuccess} errorPage={this.props.errorPage} />
                break;    
            case 'pull-battery':
                step = <CollectBattery success={this.props.battery_collected} successCb={this.props.collectSuccess} errorPage={this.props.errorPage} />
                break;    
            case 'swap-completed':
                step = <SwapCompleted soc={this.props.battery_collected} timerCb={this.props.swapCompleted} />
                break;    
            case 'startup-ongoing':
                step = <StartupOngoing />
                break;    
            default:
                step = <EasterEgg />
                break;    
        }
        return (
            <Container className="Screen d-flex w-100 h-100 p-3 mx-auto flex-column">
                <Row className='h-100 w-100'>
                    {step}
                </Row>
            </Container>
        )
    }
}