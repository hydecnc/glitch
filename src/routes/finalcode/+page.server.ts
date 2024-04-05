import { db } from '$lib/store';
import { redirect } from '@sveltejs/kit';
import { collection, getDocs } from 'firebase/firestore';

export const load = async (event) => {
  const ips: string[] = [];

  const querySnapshot = await getDocs(collection(db, 'ips'));
  querySnapshot.forEach((doc) => {
    ips.push(doc.data().ip);
    // console.log(`${doc.id} => ${doc.data()}`, doc.data());
  });

  let requestIp: string = "";
  try {
    requestIp = event.getClientAddress(); // IP from Client Request
    if (!requestIp) {
      throw new Error("requestIp is null");
    }
  } catch (error) {
    console.log('Error: ', error);
  }
  if (ips.includes(requestIp)) {
    console.log("You are not allowed to access this page.")
    redirect(302, '/blank')
  }

  return { ip: requestIp, bannedIps: ips }
}
