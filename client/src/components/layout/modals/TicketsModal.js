import {Button, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import ChooseTicketStep from "./ChooseTicketStep";
import AddCardStep from "./AddCardStep";
import ConfirmPaymentStep from "./ConfirmPaymentStep";
import {
    setUser,
    selectUser
} from "../../../service/userSlice";
import {useSelector} from "react-redux";

function TicketsModal(props) {

    const currentUser = useSelector(selectUser);
    console.log("current event", props.currentEvent);

    let nextButton = null;
    const [quantity, setQuantity] = useState(1);
    const [number, setNumber] = useState(null);
    const [expYear, setExpYear] = useState(null);
    const [expMonth, setExpMonth] = useState(null);
    const [cvv, setCvv] = useState(null);
    const [view, setView] = useState(<ChooseTicketStep quantity={quantity} setQuantity={setQuantity}/>);

    // useEffect(() => {
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     nextButton = document.querySelector(".next-btn");
    // })

    function handleNextButton(e) {
        if (props.step.nr === 1) {
            props.setStep({title: "Add card", nr: 2});
            setView(<AddCardStep setNumber={setNumber} setExpYear={setExpYear} setExpMonth={setExpMonth} setCvv={setCvv}/>);
        }
        if (props.step.nr === 2) {
            props.setStep({title: "Confirm purchase", nr: 3})
            setView(<ConfirmPaymentStep quantity={quantity}/>);
        }
        if (props.step.nr === 3) {
            proceedPayment();
        }
    }

    function handleCloseButton(e) {
        setView(<ChooseTicketStep quantity={quantity} setQuantity={setQuantity}/>)
        resetSates();
        props.handleCloseTicketModal();
    }

    function resetSates() {
        setNumber(null);
        setExpMonth(null);
        setExpYear(null);
        setCvv(null);
        setQuantity(1);
    }

    async function proceedPayment() {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXRlaSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvbG9naW4iLCJleHAiOjE2NTMwNTMxNzF9.qbjQ4AkJ8Ybky2G2AYk0b2tHsSnSc5SBfYDz1Zlb9m0");

        const raw = JSON.stringify({
            "number": number.trim(),
            "expYear": expYear.trim(),
            "expMonth": expMonth.trim(),
            "cvv": cvv.trim()
        });

        console.log("card ", raw);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/events/buy/" + currentUser.id + "/" + props.currentEvent.id + "/" + currentUser.stripeCustomerId, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result === "failed") {
                    alert("Payment failed");
                } else {
                    alert(result);
                }
            })

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
                <Button variant="secondary" onClick={handleCloseButton}>
                    Close
                </Button>
                <Button variant="primary" className="next-btn btn-danger" onClick={handleNextButton}>
                    Next step
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TicketsModal;