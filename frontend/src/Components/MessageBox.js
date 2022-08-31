import Col from 'react-bootstrap/Col';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import logo_grey from '../Images/logo-grey.png'
import logo_color from '../Images/logo-normal.png'
import Row from 'react-bootstrap/esm/Row';

function Logo(props) {
    switch (props.color) {
        case 'grey':
            return <img className='w-50' src={logo_grey} alt="Logo" />
        case 'color':
            return <img className='w-50' src={logo_color} alt="Logo" />
        default:
            return
    }
}

function StepProgress(props) {
    const steps = [1, 2, 3];
    if (typeof props.step === "number") return (
        <Row>
            <span className='text'>Etape {props.step + 1} / {steps.length}</span>
            <Stepper className='w-50' activeStep={props.step} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Row>
    )
    else return
}

export function MessageBox(props) {
    const alignStyle = { alignSelf: 'flex-end' };
    return (
        <Col className={props.color + " Message h-100 w-50 p-5"}>
            <Row className='w-100 mb-4'>
                <Logo color={props.logo} />
            </Row>
            <Row className='w-100 h-75'>
                {props.children}
            </Row>
            <Row className='w-100' style={alignStyle} >
                <StepProgress step={props.step} />
            </Row>
        </Col >
    )
}