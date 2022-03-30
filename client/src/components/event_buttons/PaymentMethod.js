import {useState} from "react";

function PaymentMethodsSelect(props) {

    const user = JSON.parse(localStorage.getItem("user"));

    const [cards, setCards] = useState("");

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:5000/api/cards/" + user.username, requestOptions)
        .then(response => response.text())
        .then(result => setCards(result))
        .catch(error => console.log('error', error));

    console.log(cards);

    return (
        <>
            <select name="role" required="" id="cardId" onChange={event => props.setCardId(event.target.value)}>
                <option aria-required="" value="pm_1KYpTIG8Vd74GxWd4WYTBB7C">pm_1KYpTIG8Vd74GxWd4WYTBB7C</option>
            </select>
        </>
    );
}

export default PaymentMethodsSelect;