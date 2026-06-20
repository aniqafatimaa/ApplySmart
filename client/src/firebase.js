import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC7FyAB9uwAqJLMUMf1J2671Oz-wgj5N5w",
  authDomain: "applysmart-2ad08.firebaseapp.com",
  projectId: "applysmart-2ad08",
  storageBucket: "applysmart-2ad08.firebasestorage.app",
  messagingSenderId: "949011684925",
  appId: "1:949011684925:web:4b8050681fa531b3675454"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)