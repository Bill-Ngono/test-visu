import './Screens.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logo from '../Images/logo-grey.png'


export function WaitForSwap() {
    return (
        <Container className="Screen d-flex w-100 h-100 p-3 mx-auto flex-column">
            <Row className='h-100 w-100'>
                <Col className="Message Orange h-100 w-50">
                    <img src={logo} alt="Logo" />;
                    <span class="Approchez-votre-batt">
                        Approchez votre batterie de la station d’échange pour commencer
                    </span>
                    <div class="Line"></div>
                    <span class="Positionnez-la-batte">
                        Positionnez la batterie en face du symbole<span class="text-style-1">à moins d’un mètre</span>pour que l’opération puisse commencer.
                    </span>
                    <span class="Etape-13">
                        Etape 1/3
                    </span>
                </Col>
                <Col>Vidéo</Col>
            </Row>
        </Container>
    )
}