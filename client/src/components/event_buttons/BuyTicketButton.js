import {useEffect, useState} from "react";
import select from "react-select/base";
import {useToast} from "@chakra-ui/react";

function BuyTicketButton(props) {

    const toast = useToast();

    const [selectedCardId, setSelectedCardId] = useState("");
    const [options, setOptions] = useState([])
    const user = JSON.parse(localStorage.getItem("user"));

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };


    function buyHandler() {
        const user = JSON.parse(localStorage.getItem("user"));

        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        console.log("user id is " + user.id);
        fetch("http://localhost:5000/events/buy/" + user.id + "/" + props.eventId + "/" + user.stripeCustomerId + "/" + selectedCardId, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result !== "failed")
                    toast({
                        title: 'Payment approved.',
                        description: "",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                else {
                    toast({
                        title: 'Payment rejected.',
                        description: "",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                }

                console.log("myresult " + result)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        fetch("http://localhost:5000/api/cards/" + user.username, requestOptions)
            .then(response => {
                return response.json();
            })
            .then((response) => {
                console.log("response " + JSON.stringify(response));

                const op = []
                for (const key in response) {
                    const card = {
                        ...response[key]
                    };
                    const option = {
                        value: card.sptripePaymentMethodId,
                        label: card.brand,
                        expYear: card.expYear
                    }
                    op.push(option);

                }

                setOptions(op);
                // console.log("options ", options);

            })
            .catch(error => console.log('error', error));

    }, [])

    return (<>
            <select onChange={(event =>
                setSelectedCardId(event.target.value))}>
                {(() => {
                    const optionsJSX = [];

                    for (let option of options) {
                        optionsJSX.push(<option key={option.label} value={option.value}>{option.label} {option.expYear}</option>);
                    }

                    return optionsJSX;
                })()}
            </select>
            <button onClick={buyHandler}>Buy Ticket</button>
        </>
    );

}

export default BuyTicketButton;
