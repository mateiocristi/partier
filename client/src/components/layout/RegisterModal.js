import {Button, Form, Modal} from "react-bootstrap";

function RegisterModal(props) {
    return (
        <Modal show={props.showRegister} onHide={props.handleCloseRegister}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="registerForm.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            onChange={e => {props.setUsername(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="registerForm.ControlInput2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            autoFocus
                            placeholder="example@email.com"
                            onChange={e => {props.setEmail(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="registerFrom.ControlInput3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            autoFocus
                            onChange={e => {props.setPassword(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="registerForm.ControlInput4">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control
                            type="password"
                            autoFocus
                            onChange={e => {props.setRepeatPassword(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="registerForm.ControlInput5">
                        <Form.Label>Account type</Form.Label>
                        <Form.Select onChange={e => {props.setUserRole(e.target.value)}}>
                            <option value="ROLE_USER">User</option>
                            <option value="ROLE_ORGANISER">Organiser</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseRegister}>
                    Close
                </Button>
                <Button variant="primary" className="btn-danger" onClick={props.registerBtnHandler}>
                    Create Account
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RegisterModal;