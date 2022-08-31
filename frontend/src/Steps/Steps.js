import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ErrorPage } from './ErrorPage';
import { InsertBattery } from './InsertBattery';
import { CollectBattery } from './PullBattery';
import { StartupOngoing } from './StartupOngoing';
import { SwapCompleted } from './SwapCompleted';
import { WaitForSwap } from './WaitForSwap';

import { useSelector } from 'react-redux';
import { selectStep } from '../features/goToPage';

export function Steps() {
    let result
    const step = useSelector(selectStep);
    switch (step) {
        case 'wait-for-swap':
            result = <WaitForSwap />
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
        case 'startup-ongoing':
            result = <StartupOngoing />
            break;
        default:
            result = <ErrorPage />
            break;
    }
    return (
        <Container className="Screen d-flex w-100 h-100 p-3 mx-auto flex-column">
            <Row className='h-100 w-100'>
                {result}
            </Row>
        </Container>
    )
}