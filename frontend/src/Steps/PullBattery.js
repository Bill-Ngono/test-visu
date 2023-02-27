import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { errorPage } from '../features/goToPage';
import './Screens.css';

import store from '../app/store';
import { ScreenBox } from '../Components/ScreenBox';
import { swapCompleted } from '../features/goToPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faHourglass3 } from '@fortawesome/free-solid-svg-icons';

import video from '../Videos/BSS_visu_step_3.mp4';

class PullTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: 30
        }
        setInterval(() => {
            if (!this.state.countdown) store.dispatch(errorPage('no-battery-inserted'));
            this.setState({ countdown: this.state.countdown - 1 })
        }, 1000)
    }

    render() {
        let battery_collected = store.getState().steps.battery_collected
        if (battery_collected) {
            setTimeout(() => {
                this.setState({ countdown: 30 });
                store.dispatch(swapCompleted())
            }, 3000);
            return (
                <div className='d-flex justify-content-end'>
                    <CircularProgressbar className='w-25' value={0} strokeWidth={50} text={`Merci !`}
                    styles={buildStyles({
                        textColor: "orange",
                        strokeLinecap: "butt"
                    })} />
                </div>
            ) 
        }
        else return (
            <div className='d-flex justify-content-end'>
                <CircularProgressbar className='w-25' value={this.state.countdown} maxValue={30} strokeWidth={50} text={this.state.countdown}
                    styles={buildStyles({
                        textColor: "orange",
                        strokeLinecap: "butt"
                    })}
                />
            </div>
        )
    }
}

export function CollectBattery(props) {
    return (
        <ScreenBox>
            <MessageBox color="Green" logo="color" step={2}>
                <p className='message-main p-0 mt-5'>
                    Récupérez votre batterie chargée
                </p>
                <div class="Line my-4 p-0"></div>
                <p className='message-alt'> 
                    <FontAwesomeIcon icon={faAngleDoubleRight} className='mx-1 fs-4' /> un compartiment s'est ouvert pour récupérer votre batterie pleine
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <strong className='mt-5'>
                        <FontAwesomeIcon icon={faHourglass3} className='mx-1 fs-4' /> Vous avez 30 secondes.
                    </strong>
                </p>
                    <PullTimer success={props.success || false} successCb={props.successCb} errorCb={props.errorPage} />
            </MessageBox>
            <GraphicsBox>
                <video src={video} style={{maxWidth: '100%', maxHeight:'100%'}}  autoplay="true" />
            </GraphicsBox>
        </ScreenBox>
    )
}