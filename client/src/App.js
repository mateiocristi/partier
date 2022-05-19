import 'material-icons/iconfont/material-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import VerticalNavbar from "./components/layout/VerticalNavbar";
import HorizontalNavbar from "./components/layout/HorizontalNavbar";
import EventsPage from "./pages/EventsPage";

import {Route, Routes} from "react-router-dom";
import AuthService from "./service/AuthService";
import {useEffect} from "react";
import {
    setUser,
    selectUser
} from "./service/userSlice";
import {
    setRole,
    setRoleUser,
    setRoleOrganiser,
    selectRole
} from "./service/roleSlice";
import {useDispatch, useSelector} from "react-redux";

function App() {

    const currentRole = useSelector(selectRole);
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        dispatch(setUser(user));
        dispatch(setRole(user.roles[0]));
    }, [])


    return (
        <div className="App">
            <section className="navSection">
                <VerticalNavbar/>
                {/*<div className="navDivider"/>*/}
            </section>
            <section className="right-section">
                <HorizontalNavbar/>
                <div className="contentSection">
                    <Routes>
                        <Route path="/" element={<EventsPage/>} exact/>
                    </Routes>
                </div>
            </section>

            {/*<FooterPage/>*/}
        </div>

    );
}

export default App;