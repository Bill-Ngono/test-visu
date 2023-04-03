import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ErrorPage } from './ErrorPage';
import { InsertBattery } from './InsertBattery';
import { CollectBattery } from './PullBattery';
import { StartupOngoing } from './StartupOngoing';
import { SwapCompleted } from './SwapCompleted';
import { WaitForSwap } from './WaitForSwap';
import { StationReboot } from './StationReboot';

import { useSelector } from 'react-redux';
import { selectStep, selectBatteryInserted } from '../utils/selectors';
import { ChargingStation } from './ChargingStation';

export function Steps() {
    let result
    const step = useSelector(selectStep());
    const battery_inserted = useSelector(selectBatteryInserted())
    switch (step) {
        case 'wait-for-swap':
            result = <WaitForSwap />
            break;
        case 'charging-station':
            result = <ChargingStation />
            break;
        case 'insert-battery':
            result = <InsertBattery />
            break;
        case 'pull-battery':
            result = <CollectBattery />
            break;
        case 'swap-completed':
            result = <SwapCompleted />
            break;
        case 'station-reboot':
            result = <StationReboot />
            break;
        case 'startup-ongoing':
            result = <StartupOngoing />
            break;
        default:
            result = <ErrorPage />
            break;
    }
    return (
        <Container fluid className="d-flex w-100 h-100 p-0 mx-auto flex-column">
            <Row className='h-100 w-100 m-0'>
                {result}
            </Row>
        </Container>
    )
}