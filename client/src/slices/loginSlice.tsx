import { createSlice, AnyAction } from '@reduxjs/toolkit'

export interface LoginState {
  userID: string;
  token: string;
  notification: string;
  isLogged: boolean;
  loading: boolean;
}

const initialState: LoginState = {
  userID: "",
  token: "",
  notification: "",
  isLogged: false,
  loading: false
}

export const loginSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    startLoading: (state: LoginState) => {
      state.loading = true;
    },
    stopLoading: (state: LoginState) => {
      state.loading = false;
    },
    loginSuccess: (state: LoginState) => {
      state.isLogged = true;
      state.notification = "Login successful";
    },
    loginFailure: (state: LoginState, action: AnyAction) => {
      state.isLogged = false;
      state.notification = action.error;
    },
    registerSuccess: (state: LoginState) => {
      state.notification = "Registration successful";
    },
    registerFailure: (state: LoginState, action: AnyAction) => {
      state.notification = action.error;
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  startLoading, 
  stopLoading, 
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure
} = loginSlice.actions

export default loginSlice.reducer