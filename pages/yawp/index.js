import AuthCheck from "../../components/AuthCheck";
import styles from '../../styles/Yawp.module.css';
import { db, postToJSON } from '../../lib/firebase';
import { collection, getDocs, Timestamp, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';



export default function Yawp() {
    let today;
    let timestamp;
    let todaysDelivery = [];

    function getStartOfToday() {
        today = new Date();
        today.setHours(8, 0, 0, 0);
        timestamp = Timestamp.fromDate(today);
        console.log(timestamp)
        return timestamp
    }

    const fetchDelivery = async () => {
        const q = query(collection(db, 'notes'), where('createdAt', '>', timestamp));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((note) => {
            console.log(note.data());
             todaysDelivery.push(note.data())
            })
            console.log(todaysDelivery)
    }
    getStartOfToday();
    fetchDelivery();

    const [deliveries, setDeliveries] = useState(todaysDelivery);


    return (
        <AuthCheck>
            <main className={styles.main}>
                <DaysDelivery delivery={deliveries} key={deliveries.date} />
            </main>
        </AuthCheck>
    );
}

function DaysDelivery({delivery}) {
    return (
        <div className="satchel">
            <p>DATE HERE</p>
            <div className="bundle">
                {delivery ? delivery.map((note) => <PostedNote note={note} key={note} />) : <PostedNote note={note} key={note} />}
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