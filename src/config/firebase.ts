import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAXuSG7FeGpi5JRljoEEjyxBK5b1JYxeKQ",
  authDomain: "cerebrosync.firebaseapp.com",
  projectId: "cerebrosync",
  storageBucket: "cerebrosync.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);