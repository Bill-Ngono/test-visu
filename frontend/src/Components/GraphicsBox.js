import Col from 'react-bootstrap/Col';

export function GraphicsBox(props) {
    return (
        <Col className="Graphics h-100 w-100 p-0">
            {props.children}
        </Col>
    )
}