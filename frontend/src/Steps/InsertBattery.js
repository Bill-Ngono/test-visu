import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import { ScreenBox } from '../Components/ScreenBox';
import { errorPage, pullBattery } from '../features/goToPage';
import './Screens.css';

import store from '../app/store';

import video from '../Videos/BSS_visu_step_2.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faHourglass3, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

class InsertTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: 300
        }
        setInterval(() => {
            if (!this.state.countdown) store.dispatch(errorPage('no-battery-inserted'));
            this.setState({ countdown: this.state.countdown - 1 })
        }, 1000)
    }

    render() {
        let battery_inserted = store.getState().steps.battery_inserted
        if (battery_inserted) {
            setTimeout(() => {
                this.setState({ countdown: 30 });
                store.dispatch(pullBattery(false))
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

export function InsertBattery(props) {
    return (
        <ScreenBox>
            <MessageBox color="Blue" logo="color" step={1}>
                <p className='message-main p-0 mt-5'>
                    Insérez votre batterie dans le compartiment ouvert <FontAwesomeIcon icon={faDoorOpen} />
                </p>
                <div class="Line my-4 p-0"></div>
                <p className='message-alt'>
                    <FontAwesomeIcon icon={faVolumeHigh} className='mx-1 fs-4' /> Le BIP vous indique que votre batterie vide est bien récupérée.
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <strong className='mt-5'>
                        <FontAwesomeIcon icon={faHourglass3} className='mx-1 fs-4' /> Vous avez 30 secondes.
                    </strong>
                </p>
                <InsertTimer success={props.success || false} successCb={props.successCb} errorCb={props.errorPage} />
            </MessageBox>
            <GraphicsBox>
                <video src={video} style={{maxWidth: '100%', maxHeight:'100%'}}  autoplay="true" />
            </GraphicsBox>
        </ScreenBox>
    )
}