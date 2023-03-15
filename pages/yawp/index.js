import AuthCheck from "../../components/AuthCheck";
import styles from '../../styles/Yawp.module.css';
import { db, postToJSON } from '../../lib/firebase';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';



export default function Yawp() {

    const fetchDelivery = async () => {
        const today = Timestamp.now();
        console.log(today);
    }
    fetchDelivery();

    const [deliveries, setDeliveries] = useState()


    return (
        <AuthCheck>
            <main className={styles.main}>
                {deliveries ? deliveries.map((delivery) => <DaysDelivery delivery={delivery} key={delivery} />) : <p>Nothing yet posted</p>}
            </main>
        </AuthCheck>
    );
}

function DaysDelivery({ delivery }) {
    return (
        <div className="satchel">
            <p>DATE HERE</p>
            <div className="bundle">
                {delivery ? delivery.map((note) => <PostedNote note={note} key={note} />) : null}
            </div>
        </div>
    );
}

function PostedNote({ note }) {
    let author = note.author.split('-').join(' ')

    return (
        <div className="whole-note">
            <p>{author}</p>
            {note.text ? <div className="note-text">{note.text}</div> : null}
            {note.media ? <img className="note-img" src={note.media} /> : null}
        </div>
    );
}