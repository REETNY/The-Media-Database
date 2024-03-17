import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
// (Optional) Import component styles. If you are using Less, import the `index.less` file. 
import "rsuite/DatePicker/styles/index.css";
import 'rsuite/RangeSlider/styles/index.css';
import 'rsuite/SelectPicker/styles/index.css';
import 'rsuite/TagPicker/styles/index.css';
import 'rsuite/Checkbox/styles/index.css';

import { IPDATASLICE } from './app/Oth/IPSlice.js'


let savedUser = JSON.parse(localStorage.getItem("userIP"));

if(savedUser == null || savedUser[0].country_code == undefined){
    store.dispatch(IPDATASLICE.endpoints.getLocation.initiate())
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)