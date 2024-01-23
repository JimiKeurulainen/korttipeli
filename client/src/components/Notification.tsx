import { useEffect, useState } from 'react';
import { Snackbar } from '@mui/joy';
import { RootState, store } from '../store';
import './Notification.scss';
import { useDispatch, useSelector } from 'react-redux';

interface MsgObj {
  message: string;
}

function Notification() {
  const [message, setMessage] = useState<string>("");
  const api = useSelector((state: RootState) => state.api);
  const dispatch = useDispatch();

  
  // useEffect(() => {
  //   // if (api.mutations.error) {
  //   //   const msg = api.mutations.error.data as MsgObj; 
  //   //   setMessage(msg.message);
  //   // }
  //   // else if (api.mutations.data) {
  //   //   // const msg = api.mutations.data as MsgObj; 
  //   //   setMessage(JSON.stringify(api.mutations.data));
  //   // }
  //   console.log('api', api);
  // }, [api.mutations]);

  // useEffect(() => {
  //   console.log('message', message);
  //   // if (message !== '') {
  //   //   const snackbars = Array.from(document.getElementsByClassName('MuiSnackbar-root') as HTMLCollectionOf<HTMLElement>);
  //   //   result.isError ? snackbars[0].classList.add('danger') : snackbars[0].classList.add('success');
  //   //   console.log('snackbars', snackbars);
  //   // }
  // }, [message]);
  
  return (
    <Snackbar
      open={message !== ''}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={2000}
      onClose={() => setMessage('')}
      key='infoSnack'
      color={api.mutations.error ? 'danger': 'success'}
    >
      {message}
    </Snackbar>
  )
}

export default Notification
