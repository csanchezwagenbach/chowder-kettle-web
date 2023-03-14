import AuthCheck from "../../components/AuthCheck";
// import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';


export default function Yawp({ deliveries }) {
    return deliveries ? deliveries.map((delivery) => <DaysDelivery delivery={delivery} key={delivery} />) : null;
}

function DaysDelivery({ notes }) {
    return (
        <div className="satchel">
            <p>DATE HERE</p>
            <div className="bundle">
                {notes ? notes.map((note) => <PostedNote note={note} key={note} />) : null}
            </div>
        </div>
    );
}

function PostedNote({ note }) {
    let author = note.author.split('-').join(' ')

    return (
        <div className="whole-note">
            <p>{author}</p>
            {note.text ? <div className="note-text">{note.text}</div> : null }
            {note.media ? <img className="note-img" src={note.media} /> : null }
        </div>
    )
}