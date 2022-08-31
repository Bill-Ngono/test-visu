import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export function ScreenBox(props) {
    return (
        <Container className="Screen d-flex w-100 h-100">
            <Row className='h-100 w-100'>
                {props.children}
            </Row>
        </Container>
    )
}