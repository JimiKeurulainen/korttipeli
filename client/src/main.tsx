import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.tsx'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './store.tsx'
import Notification from './components/Notification.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Notification />
      <Root />
    </Provider>
  </React.StrictMode>
)
