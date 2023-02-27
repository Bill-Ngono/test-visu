import Col from 'react-bootstrap/Col';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import logo_grey from '../Images/logo-grey.png'
import logo_color from '../Images/logo-normal.png'

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
        <Col className='d-flex mt-5'>
            <Col xs={3} className='p-0'>
                <span className='text'>Etape {props.step + 1} / {steps.length}</span>
            </Col>
            <Col>
                <Stepper className='w-50' activeStep={props.step} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel></StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Col>
        </Col>
    )
    else return
}

export function MessageBox(props) {
    return (
        <Col className={props.color + " Message h-100 w-100 p-5"}>
            <Logo color={props.logo} />
            <Col className='w-100'>
                {props.children}
            </Col>
            <Col className='Step_progress'>
                <StepProgress step={props.step} />
            </Col>
        </Col >
    )
}