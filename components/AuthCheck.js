import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function AuthCheck(props) {
    const { username } = useContext(UserContext);

    return username ? props.children : props.fallback || <Link href='/login'>Tuck your trouser-ends in your boots, and have a good time.</Link>
}