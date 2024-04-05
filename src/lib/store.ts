import { writable } from "svelte/store";

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCo4slUk7aiAgREbJo82HgSsMBMTTDr6t8',
    authDomain: 'glitch-79a89.firebaseapp.com',
    projectId: 'glitch-79a89',
    storageBucket: 'glitch-79a89.appspot.com',
    messagingSenderId: '859032542248',
    appId: '1:859032542248:web:4f7329a73ebc406807291d',
    measurementId: 'G-B5YP0RSFW7'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);


export const startTimer = writable(false);
export const timeOut = writable(false);
export const ip = writable("");