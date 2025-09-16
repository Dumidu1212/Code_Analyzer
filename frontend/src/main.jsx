import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import firebase from 'firebase/compat/app'



// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5J8A1l7dbMvWfIEumk3mqOeqhp3h3KoU",
  authDomain: "code-analyzer-bcc4c.firebaseapp.com",
  projectId: "code-analyzer-bcc4c",
  storageBucket: "code-analyzer-bcc4c.appspot.com",
  messagingSenderId: "766229693142",
  appId: "1:766229693142:web:9565c093fd8e1c468eff77"
};

firebase.initializeApp(firebaseConfig)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
