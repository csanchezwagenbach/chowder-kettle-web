import { auth, db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDocs, onSnapshot, collection, query, where } from 'firebase/firestore';


export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);

  

    useEffect(() => {

        let unsubscribe;

            const fetchData = async () => {
                if (user) {
                    console.log(user.uid);
                    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
                    const data = await getDocs(q);
                    console.log(data.docs[0]._document.data.value.mapValue.fields.username.stringValue);
                    setUsername(data.docs[0]._document.data.value.mapValue.fields.username.stringValue)
                } else {
                    setUsername(null);
                }
            }

            fetchData();
            return unsubscribe;
        }, [user]);

        return { user, username }
    }