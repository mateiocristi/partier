import {useState} from "react";

function PaymentMethodsSelect(props) {

    console.log("mortii");

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

    console.log("morti 2",  cards);

    return (
        <>
            <div className="input-field">
                <select>
                    <option value="" disabled selected>Choose your option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
            </div>
        </>
    );
}

export default PaymentMethodsSelect;