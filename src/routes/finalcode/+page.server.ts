import { goto } from '$app/navigation';
import { db, ip } from '$lib/store.js';
import { collection, getDocs } from 'firebase/firestore';

const ips: string[] = [];

const querySnapshot = await getDocs(collection(db, 'ips'));
querySnapshot.forEach((doc) => {
    ips.push(doc.data().ip);
    console.log(`${doc.id} => ${doc.data()}`, doc.data());
});

console.log(ips);

export const load = async (event) => {
    let requestIp;
    
    try {
      requestIp = event.getClientAddress(); // IP from Client Request
      ip.set(requestIp)
      ip.subscribe((value) => {
        console.log('IP Address from Client Request: ', typeof(value));
      })
      
      if (ips.includes(requestIp)) {
        goto("/blank")
      }
    } catch (error) {
      console.log('Error reading IP', error);
    }

    return { clientAddress: requestIp }
}
