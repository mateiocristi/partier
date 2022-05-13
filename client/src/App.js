import NavigationBar from './components/layout/NavigationBar';
import {Route, Routes} from "react-router-dom";

import Theater from "./pages/Theater";
import AllEvents from "./pages/AllEvents";
import FooterPage from "./components/layout/Footer";
import Event from "./pages/Event";
import AddEvent from "./pages/AddEvent";
import ClientUserProfilePage from "./pages/ClientUserProfile";
import ManageEvents from "./pages/ManageEvents";
import MyTicketsPage from "./pages/MyTickets";
// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.min.js';
import 'material-icons/iconfont/material-icons.css';
import VerticalNavbar from "./components/layout/VerticalNavbar";
import NewNavbar from "./components/layout/NewNavbar";
import 'bootstrap/dist/css/bootstrap.css';
import EventsHeader from "./components/events/EventsHeader";


function App() {
    return (
        <div className="App">
            {/*<NavigationBar/>*/}
            <section className="navSection">
                <VerticalNavbar/>
                {/*<div className="navDivider"/>*/}
            </section>
            <section className="right-section">
                <NewNavbar/>
                <div className="contentSection">
                    <Routes>
                        <Route path="/" element={<EventsHeader/>} exact/>
                        <Route path="/myTickets" element={<MyTicketsPage/>} exact/>
                        <Route path="/event/:eventId" element={<Event/>} exact/>
                        <Route path="/theater" element={<Theater/>} exact/>
                        <Route path="/profile" element={<ClientUserProfilePage/>} exact/>
                        <Route path="/add-event" element={<AddEvent/>} exact/>
                        <Route path="/manage-events" element={<ManageEvents/>} exact/>
                    </Routes>
                </div>
            </section>

            {/*<FooterPage/>*/}
        </div>
    );
}

export default App;