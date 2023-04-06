import { initializeApp } from 'firebase/app';

import './styles/reset.css';
import './styles/style.css';

import uiControl from './uiControl';

const firebaseConfig = {
  apiKey: 'AIzaSyBRBj-efijWMPHre-Q7yQHJNxyWnl5zrTI',
  authDomain: 'todo-list-89ba6.firebaseapp.com',
  projectId: 'todo-list-89ba6',
  storageBucket: 'todo-list-89ba6.appspot.com',
  messagingSenderId: '1066176488365',
  appId: '1:1066176488365:web:87346f6c6a6e627efef724',
};

initializeApp(firebaseConfig);

uiControl.chooseLoginMethod();
