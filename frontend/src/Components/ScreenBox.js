import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export function ScreenBox(props) {
    return (
        <Container fluid className="d-flex w-100 h-100 p-0">
            <Row className='h-100 w-100 m-0'>
                {props.children}
            </Row>
        </Container>
    )
}