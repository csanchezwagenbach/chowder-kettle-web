import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDsJ_8m8ALF6JDdanYvwxa0BAZOo23mm20",
    authDomain: "chowder-kettle.firebaseapp.com",
    projectId: "chowder-kettle",
    storageBucket: "chowder-kettle.appspot.com",
    messagingSenderId: "344658291541",
    appId: "1:344658291541:web:060a45b31d4fe798cc5ddc",
    measurementId: "G-PE3F47M420"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const firestore = firebase.firestore();
