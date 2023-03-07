import Head from 'next/head'
import { Cedarville_Cursive } from 'next/font/google';
import homeStyles from '../styles/Home.module.css';
import ClamDigger from '../components/ClamDigger';
import { firestore } from '../lib/firebase';

const cursive = Cedarville_Cursive({ weight: ['400'], subsets: ['latin']});
const userQuery = firestore.collection('users');

const user = (await userQuery.get()).docs

export default async function Home(user) {

 
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <main className={homeStyles.main}>
       
        
        <h1 className={cursive.className}>You should have been with us that day . . .</h1>

        <ClamDigger user={user} />
        
      </main>
    </>
  )
}
