import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import {store} from './redux/user/store.js'
import {adminStore} from './redux/admin/adminStore.js'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} adminStore={adminStore}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
)
