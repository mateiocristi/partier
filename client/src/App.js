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

function App() {
    return (
        <div className="App">
            <NavigationBar/>
            <Routes>
                <Route path="/" element={<AllEvents/>} exact/>
                <Route path="/myTickets" element={<MyTicketsPage/>} exact/>
                <Route path="/event/:eventId" element={<Event/>} exact/>
                <Route path="/theater" element={<Theater/>} exact/>
                <Route path="/profile" element={<ClientUserProfilePage/>} exact/>
                <Route path="/add-event" element={<AddEvent/>} exact/>
                <Route path="/manage-events" element={<ManageEvents/>} exact/>
            </Routes>
            <FooterPage/>
        </div>
    );
}

export default App;