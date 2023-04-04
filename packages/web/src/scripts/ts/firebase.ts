// Import the functions you need from the SDKs you need
import { initializeApp, getAnalytics } from '@scripts/ts/browserified/libs.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAnry8fpqcf2NZgOqYACQ3A8amb66zektU',
	authDomain: 'savee-ai.firebaseapp.com',
	projectId: 'savee-ai',
	storageBucket: 'savee-ai.appspot.com',
	messagingSenderId: '849964022934',
	appId: '1:849964022934:web:70dff69af2fb2fd4c416b7',
	measurementId: 'G-WERKCYLJMS',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

export { firebase, analytics };
