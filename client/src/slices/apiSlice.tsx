import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RegisterForm } from "./formSlice";
import User from "../models/User"
import { openNotificationFromApi } from "./notificationSlice"

interface LoginState {
  username: string;
  password: string;
}
interface RegisterResponse {
  message: string;
  error?: any;
}

export interface ApiResponse {
  isSuccess: boolean;
  message: string;
  error?: {
    data: {
      message: string;
    }
  }
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API! }),
  endpoints: (build) => ({
    loginUser: build.mutation<User, LoginState>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    registerUser: build.mutation<RegisterResponse, RegisterForm>({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (req, res) => {
        const { dispatch, queryFulfilled } = res;
        try {
          const { data } = await queryFulfilled;
          dispatch(openNotificationFromApi({
            isSuccess: true,
            message: data.message,
          }))
        }
        catch (err) {
          const error = err as ApiResponse;
          if ('status' in error.error!) {
            dispatch(openNotificationFromApi({
              isSuccess: false, 
              message: error.error.data.message
            }))
          }
          // else {
            
          // }
        }
      },
    })
  })
})

// Auto-generated hooks
export const { useLoginUserMutation, useRegisterUserMutation } = api;