import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ParameterValues {
  value: string;
  isValid: boolean;
  message?: string;
}
export interface RegisterForm {
  username: ParameterValues;
  password: ParameterValues;
  confirmation?: ParameterValues;
  email: ParameterValues;
  phone?: ParameterValues;
  verification: ParameterValues;
}
export interface ParameterOptions {
  name: string;
  value: string;
}

const initialParameters: ParameterValues = {
  value: '',
  isValid: false,
  message: '-'
}
const initialState: RegisterForm = {
  username: initialParameters,
  password: initialParameters,
  confirmation: initialParameters,
  email: initialParameters,
  phone: initialParameters,
  verification: initialParameters
}

function addError(name: string, isValid: boolean) {
  const element = document.getElementById(`${name}Error`)?.classList;
  isValid ? element?.remove('OpenError') : element?.add('OpenError');
}

export const validatorSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setParameter: (state, { payload }: PayloadAction<ParameterOptions>) => {
      const tempState = {...state}

      switch (payload.name) {
        case 'username':
        addError(payload.name, true);  
        return state = { 
            ...state, 
            username: {
              value: payload.value,
              isValid: true,
              message: '-'
            }}

        case 'password':
          if (payload.value.length < 6 && payload.value.length !== 0) {
            addError(payload.name, false);
            return state = { 
              ...state, 
              password: {
                value: payload.value,
                isValid: false,
                message: 'Password is too short'
            }}
          }
          else {
            addError(payload.name, true);
            return state = { 
              ...state, 
              password: {
                value: payload.value,
                isValid: true,
                message: '-'
            }}
          }

        case 'confirmation':
          if (payload.value !== state.password.value && payload.value.length !== 0) {
            addError(payload.name, false);
            return state = {
              ...state,
              confirmation: {
                value: payload.value,
                isValid: false,
                message: 'Passwords do not match'
              }
            }
          }
          else {
            addError(payload.name, true);
            return state = {
              ...state,
              confirmation: {
                value: payload.value,
                isValid: true,
                message: '-'
              }
            }
          }

        case 'email':
          const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
          if (!emailPattern.test(payload.value) && payload.value.length !== 0) {
            addError(payload.name, false);
            return state = {
              ...state,
              email: {
                value: payload.value,
                isValid: false,
                message: 'Invalid email format'
              }
            }
          }
          else {
            addError(payload.name, true);
            return state = {
              ...state,
              email: {
                value: payload.value,
                isValid: true,
                message: '-'
              }
            }
          }
        case 'phone':
          const phonePattern = /[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
          if (payload.value.charAt(0) === '0' && payload.value.length !== 0) {
            addError(payload.name, true);
            return state = {
              ...state,
              phone: {
                value: payload.value.substring(1),
                isValid: true,
                message: '-'
              }
            }
          }
          if (!phonePattern.test(payload.value) && payload.value.length !== 0) {
            addError(payload.name, false);
            return state = {
              ...state,
              phone: {
                value: payload.value,
                isValid: false,
                message: 'Invalid phone format'
              }
            }
          }
          else {
            addError(payload.name, true);
            return state = {
              ...state,
              phone: {
                value: payload.value,
                isValid: true,
                message: '-'
              }
            }
          }
        default:
          return state = tempState;
      }
    },
    sendForm: (state) => {
      const invalid = {...state};
      for (const prop of invalid) {
        
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  setParameter,
} = validatorSlice.actions

export default validatorSlice.reducer