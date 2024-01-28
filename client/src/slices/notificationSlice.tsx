import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ApiResponse } from './apiSlice';

export interface NotificationState {
  message: string;
  class?: string;
  open: boolean;
}
export const initialState: NotificationState = {
  message: '',
  class: 'accent',
  open: false
}


export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    openNotificationFromApi: (state, { payload }: PayloadAction<ApiResponse>) => {
      const tempState = {...state};

      tempState.message = payload.message;
      tempState.class = payload.isSuccess ? 'success' : 'danger';
      tempState.open = true;

      return tempState;
    },
    openNotification: (state, { payload }: PayloadAction<NotificationState>) => {
      return 
    },
    closeNotification: (state) => {
      state = {...initialState};
      console.log('closenotification', state);
    }
  },
})

// Action creators are generated for each case reducer function
export const { openNotificationFromApi, openNotification, closeNotification } = notificationSlice.actions

export default notificationSlice.reducer