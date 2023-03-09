import '../styles/globals.css';
import NavBar from '@/components/NavBar'
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

export default function App({ Component, pageProps }) {
  const userData = useUserData();
  console.log(userData)

  return (
    <UserContext.Provider value={userData}>
      <NavBar />
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
