import {Button, Form, Modal} from "react-bootstrap";
import React, {useState} from "react";
import ChooseTicketStep from "./ChooseTicketStep";
import AddCardStep from "./AddCardStep";
import ConfirmPaymentStep from "./ConfirmPaymentStep";

function TicketsModal(props) {

    const [quantity, setQuantity] = useState(1);
    const [number, setNumber] = useState(null);
    const [expYear, setExpYear] = useState(null);
    const [expMonth, setExpMonth] = useState(null);
    const [cvv, setCvv] = useState(null);
    const [view, setView] = useState(<ChooseTicketStep quantity={quantity} setQuantity={setQuantity}/>);

    function handleButton(e) {
        if (props.step.nr === 1) {
            props.setStep({title: "Add card", nr: 2})
            setView(<AddCardStep setNumber={setNumber} setExpYear={setExpYear} setExpMonth={setExpMonth} setCvv={setCvv}/>)
        }
        if (props.step.nr === 2) {
            props.setStep({title: "Confirm purchase", nr: 3})
            setView(<ConfirmPaymentStep quantity={quantity}/>)
        }
        if (props.set.nr === 3) {

        }
    }

    return (
        <Modal show={props.showTicketModal} onHide={props.handleCloseTicketModal}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.step.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { view }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseTicketModal}>
                    Close
                </Button>
                <Button variant="primary" className="btn-danger" onClick={props.goToStep2}>
                    Next step
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TicketsModal;