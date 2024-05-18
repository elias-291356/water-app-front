import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "./thunk";
const initialState = {
  email: " ",
  token: null,
  isLogin: false,
  error: null,
  isLoading: false,
};

const periodSlice = createSlice({
  name: "period",
  initialState,
  reducers: {
    setSubmit: (state, action) => {
      state.isSubmit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //=====================REGISTER
      .addCase(registerThunk.pending, (state) => {
        state.isLogin = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLogin = true;
        state.email = action.payload.email;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLogin = false;

        // state.error = action.payload;
      })
      //=====================LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.isLogin = true;
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLogin = true;
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setSubmit } = periodSlice.actions;
export const periodInfoReducer = periodSlice.reducer;
