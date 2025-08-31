import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import userSliceReducer from "../features/user/userSlice.js";
import taskSliceReducer from "../features/task/taskSlice.js";
import { loginSuccess} from "../features/auth/authSlice.js";
import { addUser } from "../features/user/userSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userSliceReducer,
        tasks: taskSliceReducer,
    }
})

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (token && user) {
  store.dispatch(loginSuccess({ token }));
  store.dispatch(addUser(user));
}