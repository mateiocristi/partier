function ConfirmPaymentStep(props) {
    const dummyPrice = props.quantity * 100;
    return (
        <h1>You will buy {props.quantity} ticket(s) at the price of ${}</h1>
    )
}

export default ConfirmPaymentStep;