import { createSlice } from '@reduxjs/toolkit'
import type { AnyAction, PayloadAction } from '@reduxjs/toolkit'

export interface NotificationState {
  message: string;
  class: string;
  open: boolean;
}

const initialState: NotificationState = {
  message: '',
  class: 'accent',
  open: false
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    openNotification: (state, payload: any) => {
      state.message = payload.message;
      state.class = payload.isError ? 'danger' : 'success';
      state.open = true;
    },
    closeNotification: (state) => {
      state = initialState;
    }
  },
})

// Action creators are generated for each case reducer function
export const { openNotification, closeNotification } = notificationSlice.actions

export default notificationSlice.reducer