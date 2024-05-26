import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//
const firebaseConfig = {
  apiKey: "AIzaSyAjGPFLnczMaTa_3K5gbLnjLaGmyIb4eBY",
  authDomain: "thedarkartist-b88c0.firebaseapp.com",
  projectId: "thedarkartist-b88c0",
  storageBucket: "thedarkartist-b88c0.appspot.com",
  messagingSenderId: "469086560056",
  appId: "1:469086560056:web:9a0c620dd494ff32cc6bcd",
  measurementId: "G-44SJSYDF44"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

