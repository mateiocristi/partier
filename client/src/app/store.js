import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../service/userSlice";
import roleReducer from "../service/roleSlice";

export default configureStore({
    reducer: {
        currentUser: userReducer,
        currentRole: roleReducer
    },
});