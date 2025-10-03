import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: "",
    name: "",
    profileImage: "",
    focus: "",
    insights: { insights: [], createdAt: null },
    subscription: {
      plan: "free",
      paypalSubscriptionId: null,
      status: "active",
      startDate: null,
      endDate: null,
      nextBillingDate: null
    }
  },
  reducers: {
    addUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => ({
      id: null,
      email: "",
      name: "",
      profileImage: "",
      focus: "",
      insights: { insights: [], createdAt: null },
      subscription: {
        plan: "free",
        paypalSubscriptionId: null,
        status: "active",
        startDate: null,
        endDate: null,
        nextBillingDate: null
      }
    })
  }
});

export const { addUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
