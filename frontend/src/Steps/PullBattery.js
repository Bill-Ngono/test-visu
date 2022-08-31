import React from 'react';
import { GraphicsBox } from '../Components/GraphicsBox';
import { MessageBox } from '../Components/MessageBox';
import './Screens.css';

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import store from '../app/store';
import { ScreenBox } from '../Components/ScreenBox';
import { swapCompleted } from '../features/goToPage';

class PullTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: 30
        }
        setInterval(() => {
            if (!this.state.countdown) this.props.errorCb();
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
            return <CircularProgressbar className='w-25' value={0} strokeWidth={50} text={`Merci !`}
                styles={buildStyles({
                    textColor: "white",
                    strokeLinecap: "butt"
                })} />
        }
        else return (
            <div>
                <CircularProgressbar className='w-25' value={this.state.countdown} maxValue={30} strokeWidth={50} text={this.state.countdown}
                    styles={buildStyles({
                        textColor: "white",
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
                <p className='message-main py-5'>
                    Insérez votre batterie dans le compartiment ouvert
                </p>
                <div class="Line"></div>
                <p className='py-5 message-alt'>
                    Le BIP vous indique que votre batterie vide est bien récupérée.
                    <br />
                    Vous avez 30 secondes.
                </p>
                    <PullTimer success={props.success || false} successCb={props.successCb} errorCb={props.errorPage} />
            </MessageBox>
            <GraphicsBox>GraphicsBox</GraphicsBox>
        </ScreenBox>
    )
}