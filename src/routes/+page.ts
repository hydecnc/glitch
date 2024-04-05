import { db } from '$lib/store';
import { collection, getDocs } from 'firebase/firestore';

const ips: string[] = [];

const querySnapshot = await getDocs(collection(db, 'ips'));
querySnapshot.forEach((doc) => {
    ips.push(doc.data().ip);
    console.log(`${doc.id} => ${doc.data()}`, doc.data());
});

console.log(ips);