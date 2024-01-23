import './Login.scss'
import { useEffect, useState } from 'react';
import { useRegisterUserMutation } from '../slices/apiSlice';
import loadingIcon from '../assets/loadingIcon.svg';

interface RegisterForm {
  username: string;
  password: string;
  confirmation: string;
  email: string;
  phone: string;
  verification: string;
}
export interface DispatchForm {
  username: string;
  password: string;
  email: string;
  phone?: string;
  verification: string;
}

const initialForm = {
  username: "",
  password: "",
  confirmation: "",
  email: "",
  phone: "",
  verification: "email"
}

function Register() {
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [registerUser, result] = useRegisterUserMutation();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
  }
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const tempForm: any = { ...form }; 
    delete tempForm.confirmation;
    const dispatchForm: DispatchForm = tempForm;

    registerUser(dispatchForm);
  }

  // useEffect(() => {
  //   console.log('result register', result);
  // }, [result])
  
  return (
    <div className='LoginContainer'>
      <div className='FormContainer'>
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" onChange={onChange} value={form.username}/>

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" onChange={onChange} value={form.password}/>
          <label htmlFor="confirmation">Confirm Password:</label>
          <input type="password" name="confirmation" onChange={onChange} value={form.confirmation}/>

          <label htmlFor="email">Email:</label>
          <input type="email" name="email" onChange={onChange} value={form.email}/>

          <label htmlFor="phone">Phone Number:</label>
          <input type="phone" name="phone" onChange={onChange} value={form.phone}/>

          <label>Preferred Account Verification Method:</label>
          <span>
            <label htmlFor="radio1">Email</label>
            <input type="radio" name="verification" id="radio1" value="email" onChange={onChange}/>
            <label htmlFor="radio2">Phone</label>
            <input type="radio" name="verification" id="radio2" value="phone" onChange={onChange}/>
          </span>
          <button type="submit">{result.isLoading ? <img src={loadingIcon} /> : 'Register'}
          </button>
          <a href="login">Already have an account?</a>
          {/* <small>{result.data && result.data.message}</small> */}
        </form>
        <h2 className='Logo'>Template</h2>
      </div>
    </div>
  )
}

export default Register
