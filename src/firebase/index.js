import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDmhaWluhmpU_L_TNEBmuMG798KvZtI77s",
  authDomain: "auto-money-18dc1.firebaseapp.com",
  projectId: "auto-money-18dc1",
  storageBucket: "auto-money-18dc1.appspot.com",
  messagingSenderId: "329529392216",
  appId: "1:329529392216:web:3a4636c700c0f4ce66de2d",
  measurementId: "G-VY404LMPGR"
}

initializeApp(config);
const dbFirestore = getFirestore();
const collectionRef = (colName) => collection(dbFirestore, colName);

export {
  dbFirestore,
  collectionRef
};
