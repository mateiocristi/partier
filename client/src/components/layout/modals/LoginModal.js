import {Button, Form, Modal} from "react-bootstrap";

function LoginModal(props) {
    return (
        <Modal show={props.showLogin} onHide={props.handleCloseLogin}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            onChange={(e) => {props.setUsername(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="loginForm.ControlInput2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            autoFocus
                            onChange={e => {props.setPassword(e.target.value)}}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseLogin}>
                    Close
                </Button>
                <Button variant="primary" className="btn-danger" onClick={props.loginBtnHandler}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LoginModal;