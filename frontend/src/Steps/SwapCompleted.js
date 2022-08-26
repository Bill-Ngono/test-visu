import './Screens.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logo from '../Images/logo-normal.png'
import { useDispatch } from 'react-redux';
import { waitForSwap } from '../features/goToPage';

export function SwapCompleted(props) {
    const dispatch = useDispatch()
    setTimeout(() => {
        dispatch(waitForSwap())
    }, 10000);
    return (
        <Container className="Screen d-flex w-100 h-100 p-3 mx-auto flex-column">
            <Row className='h-100 w-100'>
                <Col className="Message Blue h-100 w-50">
                    <img src={logo} alt="Logo" />;
                    <span class="Approchez-votre-batt">
                        Swap terminé
                    </span>
                    <div class="Line"></div>
                    <span class="Positionnez-la-batte">
                        Bonne route !
                    </span>
                </Col>
                <Col>Vidéo</Col>
            </Row>
        </Container>
    )
}