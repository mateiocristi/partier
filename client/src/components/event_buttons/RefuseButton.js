// TODO: change name !
function ApproveButton(props) {

    function refuseHandler(){
        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("http://localhost:5000/events/delete/"+props.eventId, requestOptions)
            .then(response => response.text())
            .then(result => props.removeEventFromLoadedEvents(props.eventId))
            .catch(error => console.log('error', error));
    }

    return (
        <button onClick={refuseHandler}>Refuse</button>
    );
}

export default ApproveButton;