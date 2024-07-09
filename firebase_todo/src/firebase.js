import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'


const firebaseConfig = {
	apiKey: 'AIzaSyBTetAHt_cWDkNSXAEJaReVZ1927ifpiK4',
	authDomain: 'todoproject-630a7.firebaseapp.com',
	projectId: 'todoproject-630a7',
	storageBucket: 'todoproject-630a7.appspot.com',
	messagingSenderId: '732460033881',
	appId: '1:732460033881:web:a251d32ebd804fead58e48',
	databaseURL: 'https://todoproject-630a7-default-rtdb.europe-west1.firebasedatabase.app/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
