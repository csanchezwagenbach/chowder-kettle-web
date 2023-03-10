import { Arsenal } from 'next/font/google';
import { storage } from '../lib/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { useState, useEffect } from 'react';

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
        <div>
            <div>
                <h5 className={font.className}>{user.name}</h5>
                <img src={avatar}></img>
            </div>
            <div>
                <p className={font.className}>{user.status} in {user.home_location}</p>
            </div>
        </div>
    );
}