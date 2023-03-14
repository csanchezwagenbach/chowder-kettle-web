import { Arsenal } from 'next/font/google';
import { storage } from '../lib/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { useState, useEffect } from 'react';
import styles from '../styles/ClamDigger.module.css';

const font = Arsenal({ weight: ['400'], subsets: ['latin']})

export default function ClamDigger({user}) {

    const [avatar, setAvatar] = useState(null);

    const avatarPhoto = async () => {
        const avatarRef = ref(storage, user.username + '/' + user.username + '.jpg');
        const url = await getDownloadURL(avatarRef);
        setAvatar(url);
        console.log(avatar);
    }

    useEffect(() => {
        avatarPhoto();
    })

    return (
        <div key={user.name} className={font.className}>
            <div className={styles.face}>
                <h5 className={styles.name}>{user.name}</h5>
                <img className={styles.avatar} src={avatar}></img>
            </div>
            <div>
                <p className={styles.status}>{user.status} in {user.home_location}</p>
            </div>
        </div>
    );
}