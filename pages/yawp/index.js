import AuthCheck from "../../components/AuthCheck";
import styles from '../../styles/Yawp.module.css';
import { db, postToJSON } from '../../lib/firebase';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';



export default function Yawp() {

    const fetchDelivery = async () => {
        const querySnapshot = await getDocs 
        // Query Posts that come from the time between last midnight and NOW
        //So I want a way to grab the timestamp that was last midnight, and I'll use that as the parameter in a WHERE addition to the query
    }
    fetchDelivery();

    const [deliveries, setDeliveries] = useState()


    return (
        <AuthCheck>
            <main className={styles.main}>
                {deliveries ? deliveries.map((delivery) => <DaysDelivery delivery={delivery} key={delivery.date} />) : <p>Nothing yet posted</p>}
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