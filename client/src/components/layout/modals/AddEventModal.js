import {Button, Form, Modal} from "react-bootstrap";
import React from "react";

function AddEventModal(props) {
    return (
        <Modal show={props.showAddForm} onHide={props.handleCloseAddForm}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title>Add event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="addEventForm.ControlInput1">
                        <Form.Label>Event title</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            onChange={(e) => {
                                props.setTitle(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="addEventForm.ControlInput2">
                        <Form.Label>Event description</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            onChange={e => {
                                props.setDescription(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="addEventForm.ControlInput3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            onChange={e => {
                                props.setLocation(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="addEventForm.ControlInput4">
                        <Form.Label>Start date</Form.Label>
                        <Form.Control
                            type="date"
                            autoFocus
                            onChange={e => {
                                props.setStartDate(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="addEventForm.ControlInput5">
                        <Form.Label>End date</Form.Label>
                        <Form.Control
                            type="date"
                            autoFocus
                            onChange={e => {
                                props.setEndDate(e.target.value)
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseAddForm}>
                    Close
                </Button>
                <Button variant="primary" className="btn-danger" onClick={props.submitEventHandler}>
                    Add Event
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddEventModal;