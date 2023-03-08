import { auth, db } from '../lib/firebase';
import { RecaptchaVerifier } from 'firebase/auth';
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
    
        const phoneNumber = `+{digits}`;
    
        // Verify Invite
        useEffect(() => {
            if (phoneNumber.length === 12) {
                const ref = db.collection('invites').doc(phoneNumber);
                ref.get().then(({ exists }) => { setInvited(exists) });
            } else {
                setInvited(false);
            }
        }, [phoneNumber]);
    
        // Sign In
        const signInWithPhoneNumber = async () => {
            setConfirmationResult(await auth.signInWithPhoneNumber(phoneNumber, recaptcha));
        };
    
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
    
                    <button onClick={signInWithPhoneNumber}>
                        Sign In
                    </button>
                </fieldset>
    
                {confirmationResult && (
                    <fieldset>
                        <label>erify code</label>
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