import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCXnf00dMhTm2Fzz-NYQ2IY4OQ_oIr1XoE",
  authDomain: "movieui-76cd9.firebaseapp.com",
  projectId: "movieui-76cd9",
  storageBucket: "movieui-76cd9.appspot.com",
  messagingSenderId: "835418937889",
  appId: "1:835418937889:web:169598d1560aa187b76160",
  measurementId: "G-GK6F0LHF15"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);