import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LoginState } from "./loginSlice"
import { LoginForm } from "../components/Login"
import { DispatchForm } from "../components/Register"
import User from "../models/User"
import { store } from "../store"
import { openNotification } from "./notificationSlice"

interface ReturnJSON {
  message: string;
  error?: any;
}

interface CustomError {
  isError: boolean;
  isSuccess: boolean;
  error: {
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
    registerUser: build.mutation<ReturnJSON, DispatchForm>({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (req, res) => {
        const { dispatch, queryFulfilled } = res;
        try {
          const { data } = await queryFulfilled;
          console.log('queryfulfilled', data);
          // dispatch(openNotification(data.message))
        }
        catch (err) {
          console.log('error', err);
          const error = err as CustomError;
          // if ('status' in error.error) {
          //   dispatch(error.error.data)
          // }
          // else {
          //   setMessage(result.error.message!);
          // }
        }
      },
    })
  })
})

// Auto-generated hooks
export const { useLoginUserMutation, useRegisterUserMutation } = api;