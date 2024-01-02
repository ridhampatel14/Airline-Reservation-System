import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseApp = firebase.initializeApp({
	// apiKey: process.env.REACT_APP_FIREBASE_KEY,
	// authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	// projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	// storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
	// appId: process.env.REACT_APP_FIREBASE_APP_ID,
	apiKey: "AIzaSyDZIwh499dUqKdt2ewV4Fsh2M5bhyivPKY",
  	authDomain: "airline-f3532.firebaseapp.com",
  	projectId: "airline-f3532",
  	storageBucket: "airline-f3532.appspot.com",
  	messagingSenderId: "45263904256",
  	appId: "1:45263904256:web:b85678f527998ad0cf42e5",
  	//measurementId: "G-0NCB12NJ81"
});
console.log('Firebase initialized:', firebaseApp);
export default firebaseApp;

