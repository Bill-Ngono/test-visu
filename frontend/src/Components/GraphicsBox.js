import Col from 'react-bootstrap/Col';

export function GraphicsBox(props) {
    return (
        <Col className="Graphics h-100 w-50">
            {props.children}
        </Col>
    )
}