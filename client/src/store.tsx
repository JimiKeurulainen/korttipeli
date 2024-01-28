import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import notificationReducer from './slices/notificationSlice';
import formReducer from './slices/formSlice';
import { api } from './slices/apiSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    form: formReducer,
    notification: notificationReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch