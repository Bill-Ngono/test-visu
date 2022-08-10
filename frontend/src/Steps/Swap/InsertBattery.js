import '../Screens.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logo from '../../Images/logo-normal.png'

import {
    CircularProgressbar, buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


class InsertTimer extends React.Component {
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
        if (this.props.success) {
            setTimeout(() => this.props.successCb(), 3000);
            return <CircularProgressbar value={0} strokeWidth={50} text={`Merci !`}
                styles={buildStyles({
                    textColor: "white",
                    strokeLinecap: "butt"
                })} />
        }
        else return (
            <div>
                <CircularProgressbar value={this.state.countdown} maxValue={30} strokeWidth={50} text={ this.state.countdown }
                    styles={buildStyles({
                        textColor: "white",
                        strokeLinecap: "butt"
                    })}
                />
            </div>
        )
    }
}

export function InsertBattery(props) {
    return (
        <Container className="Screen d-flex w-100 h-100 p-3 mx-auto flex-column">
            <Row className='h-100 w-100'>
                <Col className="Message Blue h-100 w-50">
                    <img src={logo} alt="Logo" />;
                    <span class="Approchez-votre-batt">
                        Insérez votre batterie dans le compartiment ouvert
                    </span>
                    <div class="Line"></div>
                    <span class="Positionnez-la-batte">
                        Le BIP vous indique que votre batterie vide est bien récupérée.
                    </span>
                    <span class="Positionnez-la-batte">
                        Vous avez 30 secondes.
                    </span>
                    <InsertTimer success={props.success || false} successCb={props.successCb} errorCb={props.errorPage} />

                    <span class="Etape-13">
                        Etape 2/3
                    </span>
                </Col>
                <Col>Vidéo</Col>
            </Row>
        </Container>
    )
}