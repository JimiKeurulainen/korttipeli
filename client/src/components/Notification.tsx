import { useEffect } from 'react';
import { RootState } from '../store';
import './Notification.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotification } from '../slices/notificationSlice';


function Notification() {
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
    <div className='Snackbar'>
      {notification.message}
    </div>
  )
}

export default Notification
