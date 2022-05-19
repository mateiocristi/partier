import {Form} from "react-bootstrap";
import React from "react";

function ChooseTicketStep(props) {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="addEventForm.ControlInput1">
                <Form.Select aria-label="select ticket">
                    <option>Open this select menu</option>
                    <option value="VIP">VIP</option>
                    <option value="STANDARD">Standard</option>
                    <option value="GOLD">Gold</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="addEventForm.ControlInput2">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                    type="number"
                    value={props.quantity}
                    onChange={e => {
                        props.setQuantity(e.target.value)
                    }}
                />
            </Form.Group>
        </Form>

    )
}

export default ChooseTicketStep;