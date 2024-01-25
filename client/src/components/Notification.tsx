import { useEffect } from 'react';
import { RootState } from '../store';
import './Notification.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotification } from '../slices/notificationSlice';


function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState)  => state.notification); 

  useEffect(() => {
    const snackbar = document.getElementsByClassName('Snackbar')[0]?.classList!;

    if (notification.open) {
      snackbar.remove('close');
      snackbar.add('open');
      snackbar.add(notification.class!);

      setTimeout(() => {
        dispatch(closeNotification());
        snackbar.remove(notification.class!);
        snackbar.remove('open');
        snackbar.add('close');
      }, 2500);
    }
  }, [notification]);
  
  return (
    <div className='Snackbar'>
      {notification.message}
    </div>
  )
}

export default Notification
