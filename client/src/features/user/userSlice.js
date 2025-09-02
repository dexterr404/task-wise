import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { id: null, email: "", name: "", profileImage: "", focus: "" },
    reducers: {
        addUser: (state, action) => {
            return { ...state, ...action.payload}
        },
        clearUser: () => ({ id: null, email: "", name: "", profileImage: "", focus: ""})
    }
})

export const { addUser,clearUser } = userSlice.actions;
export default userSlice.reducer;