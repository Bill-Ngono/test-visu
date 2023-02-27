import Col from 'react-bootstrap/Col';

export function GraphicsBox(props) {
    return (
        <Col className="Graphics d-flex justify-content-center align-items-center h-100 w-100 p-0">
            {props.children}
        </Col>
    )
}