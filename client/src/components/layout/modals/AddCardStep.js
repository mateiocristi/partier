import {Form} from "react-bootstrap";
import React, {useState} from "react";

function AddCardStep(props) {

    return (
        <Form>
            <Form.Group className="mb-3" controlId="addEventForm.ControlInput1">
                <Form.Select aria-label="select ticket">
                    <option>Open this select menu</option>
                    <option value="VIP">VIP</option>
                    <option value="STANDARD">Standard</option>
                    <option value="GOLD">Gold</option>
                </Form.Select>
            </Form.Group >
            <Form.Group className="mb-3" controlId="addEventForm.ControlInput2">
                <Form.Label>Card number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    onChange={e => {
                        props.setNumber(e.target.value)
                    }}
                />
                <Form.Label>Expiration month</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="7"
                    onChange={e => {
                        props.setExpMonth(e.target.value)
                    }}
                />
                <Form.Label>Expiration year</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="20XX"
                    onChange={e => {
                        props.setExpYear(e.target.value)
                    }}
                />
                <Form.Label>Cvv</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="XXX"
                    onChange={e => {
                        props.setCvv(e.target.value)
                    }}
                />
            </Form.Group>
        </Form>

    )
}

export default AddCardStep;