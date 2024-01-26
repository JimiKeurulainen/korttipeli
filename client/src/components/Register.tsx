import './Login.scss'
import { useEffect, useState } from 'react';
import { useRegisterUserMutation } from '../slices/apiSlice';
import loadingIcon from '../assets/loadingIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setParameter } from '../slices/formSlice';
import { RootState } from '../store';
import { RegisterForm } from '../slices/formSlice';
import axios from 'axios';

interface Country {
  name: {
    common: string;
  }
  idd: { 
    root: string; 
    suffixes:  Array<string>;
  }
  flag: string;
  independent: boolean;
}
interface TelData {
  name: string;
  idd: string;
  flag: string;
}

const initialTel: TelData = {
  name: '',
  idd: '+123',
  flag: ''
}

function Register() {
  // const [form, setForm] = useState<RegisterForm>(initialForm);
  const [telData, setTelData] = useState<TelData[]>([initialTel]);
  const [activeTel, setActiveTel] = useState<TelData>(initialTel);
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [registerUser, result] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.validator);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all?fields=flag,name,idd,independent').then(res => {
      const filtered = res.data.filter((country: Country) => country.independent).map((country: Country) => {
          return {
            name: country.name.common,
            idd: country.idd.root + country.idd.suffixes[0],
            flag: country.flag
          }
      });
      filtered.sort((a: Country, b: Country) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setTelData(filtered);
    });
  }, []);

  const handleOpen = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setOpenSelect(openSelect => !openSelect);
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setParameter({
      name: event.target.name,
      value: event.target.value
    }))
  }
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(sendForm());
  }
  
  return (
    <div className='LoginContainer'>
      <div className='FormContainer'>
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" onChange={onChange} value={form.username.value}/>
          <small id="usernameError">{form.username.message}</small>

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" onChange={onChange} value={form.password.value}/>
          <small id="passwordError">{form.password?.message}</small>
          <label htmlFor="confirmation">Confirm Password:</label>
          <input type="password" name="confirmation" onChange={onChange} value={form.confirmation?.value}/>
          <small id="confirmationError">{form.confirmation?.message}</small>

          <label htmlFor="email">Email:</label>
          <input type="email" name="email" onChange={onChange} value={form.email.value}/>
          <small id="emailError">{form.email.message}</small>

          <label htmlFor="phone">Phone Number:</label>
          <span className='PhoneContainer'>
            <button className='OpenSelection' onClick={handleOpen}>
              {activeTel.flag} {activeTel.idd}
            </button>
            {openSelect && <div className='TelSelection'>
              {telData.map(country => (
                <span className='Option' key={country.name} onClick={(e) => {
                  handleOpen(e); 
                  setActiveTel(country);
                }}>
                  {country.flag} {country.name} {country.idd} 
                </span>
              ))}
            </div>}
            <input type="phone" name="phone" onChange={onChange} value={form.phone?.value}/>
          </span>
          <small id="phoneError">{form.phone?.message}</small>

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
        </form>
        <h2 className='Logo'>Template</h2>
      </div>
    </div>
  )
}

export default Register
