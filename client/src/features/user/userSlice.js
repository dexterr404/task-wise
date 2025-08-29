import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { id: null, email: "", name: "", profileImage: "" },
    reducers: {
        addUser: (state, action) => {
            return { ...state, ...action.payload}
        },
        clearUser: () => ({ id: null, email: "", name: "", profileImage: ""})
    }
})

export const { addUser,clearUser } = userSlice.actions;
export default userSlice.reducer;