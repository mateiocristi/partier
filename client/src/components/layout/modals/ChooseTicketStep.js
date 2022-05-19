import {Form} from "react-bootstrap";
import React, {useState} from "react";

function ChooseTicketStep(props) {

    const [quantity, setQuantity] = useState(1);
    const dummyPrice = 100;
    return (
        <Form>
            <Form.Group className="mb-3" controlId="addEventForm.ControlInput1">
                <Form.Label>Ticket type</Form.Label>
                <Form.Select aria-label="select ticket">
                    <option value="VIP">VIP</option>
                    <option value="STANDARD">Standard</option>
                    <option value="GOLD">Gold</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="addEventForm.ControlInput2">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                    type="number"
                    onChange={e => {
                        console.log("cahnged ", e.target.value);
                        props.setQuantity(e.target.value);
                        setQuantity(e.target.value);
                    }}
                />
            </Form.Group>
            <h3>Total: ${quantity * dummyPrice}</h3>
        </Form>

    )
}

export default ChooseTicketStep;