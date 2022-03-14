function ApproveEventButton(props) {

    function approveHandler(){
        let requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        fetch("http://localhost:5000/events/approve/"+props.eventId, requestOptions)
            .then(response => response.text())
            .then(result => props.removeEventFromLoadedEvents(props.eventId))
            .catch(error => console.log('error', error));
    }

    return (
        <button onClick={approveHandler}>Approve</button>
    );
}

export default ApproveEventButton;