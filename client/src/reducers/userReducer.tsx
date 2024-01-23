import axios from 'axios';
import { Action, Reducer } from 'redux';

import User from '../models/User';

export interface LoginState {
  token: string
}
const initialLogin: LoginState = {
  token: ''
};

const userReducer: Reducer<LoginState, Action> = (state = initialLogin, action) => {
  console.log(action);
  switch(action.type) {
    case "LOGIN":
      axios.post(process.env.REACT_APP_LOGIN!, );
      return {
        count: state.count + 1
      }
    case "REGISTER":
      axios.post(process.env.REACT_APP_REGISTER!);
      return {
        count: state.count - 1
      }
    default:
      return state;
  }
}

export default userReducer;