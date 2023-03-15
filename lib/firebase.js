import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDsJ_8m8ALF6JDdanYvwxa0BAZOo23mm20",
    authDomain: "chowder-kettle.firebaseapp.com",
    projectId: "chowder-kettle",
    storageBucket: "chowder-kettle.appspot.com",
    messagingSenderId: "344658291541",
    appId: "1:344658291541:web:060a45b31d4fe798cc5ddc",
    measurementId: "G-PE3F47M420"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export function postToJSON(doc) {
    const data = doc.data();
    return {
        ...data,
        createdAt: data.createdAt.toMillis()
    }
}


