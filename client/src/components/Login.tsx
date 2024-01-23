import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store';
import {} from '../slices/loginSlice';
import './Login.scss'
import { useState } from 'react';

export interface LoginForm {
  username: string;
  password: string;
}

const initialForm = {
  username: "",
  password: ""
}

function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState<LoginForm>(initialForm);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
  }
  
  return (
    <div className='LoginContainer'>
      <div className='FormContainer'>
        <h1>Sign In</h1>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" value={form.username} onChange={onChange}/>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" value={form.password} onChange={onChange}/>
          <button type="submit">Sign in</button>
          <a href="register">Don't have an account?</a>
        </form>
      </div>
      <h2 className='Logo'>Template</h2>
    </div>
  )
}

export default Login
