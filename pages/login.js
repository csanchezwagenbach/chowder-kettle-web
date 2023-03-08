import { auth, db } from '../lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useRef, useEffect } from 'react';

export default function Login(props) {

    function SignIn() {
        const [recaptcha, setRecaptcha] = useState(null);
        const element = useRef(null);
    
        useEffect(() => {
            if (!recaptcha) {
    
                const verifier = new RecaptchaVerifier(element.current, {
                    size: 'invisible',
                }, auth)

               
    
                verifier.verify().then(() => setRecaptcha(verifier));
    
            }
        });
    
        return (
            <>
                {recaptcha && <PhoneNumberVerification recaptcha={recaptcha} />}
                <div ref={element}></div>
            </>
        );
    }
    
    function PhoneNumberVerification({ recaptcha }) {
        const [digits, setDigits] = useState('');
        const [invited, setInvited] = useState(false);
        const [confirmationResult, setConfirmationResult] = useState(null);
        const [code, setCode] = useState('');
    
        const phoneNumber = `+${digits}`;
    
        const checkConnection = async () => {
            const ref = doc(db, 'invites', phoneNumber);
            console.log(db);
            console.log(phoneNumber)
            const snap = await getDoc(ref);
            if (snap.exists()) {
                console.log(snap.data())
                setInvited(true)
                console.log(invited);
            }
        }

        // Verify Invite
        useEffect(() => {
            if (phoneNumber.length === 12) {
                checkConnection();            
            } else {
                setInvited(false)
            }
        }, [phoneNumber]);
    
        
       
        const sendText = async () => {
            const text = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
            console.log(text);
        }
    
        // Verify SMS code
        const verifyCode = async () => {
            const result = await confirmationResult.confirm(code);
            console.log(result.user);
        };
    
        return (
            <div>
                <h1>Sign Up</h1>
                <fieldset>
                    <label>10 digit phone number</label>
                    <br />
                    <input value={digits} onChange={(e) => setDigits(e.target.value)} />
    
                    <button onClick={sendText}>
                        Sign In
                    </button>
                </fieldset>
    
                {invited  && (
                    <fieldset>
                        <label>Verify code</label>
                        <br />
                        <input value={code} onChange={(e) => setCode(e.target.value)} />
    
                        <button onClick={verifyCode}>Verify Code</button>
                    </fieldset>
                )}
            </div>
        );
    }

    return (
        <>
            <SignIn />
        </>
    )
}