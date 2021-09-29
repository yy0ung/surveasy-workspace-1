import { initializeApp } from "firebase/app"
import { } from 'firebase/analytics';
import { } from 'firebase/auth';
import { } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCyzPKNXd6uNXK7kZET6CKrw-pr95UsJhQ",
    authDomain: "surveasy-prototype.firebaseapp.com",
    projectId: "surveasy-prototype",
    storageBucket: "surveasy-prototype.appspot.com",
    messagingSenderId: "920459035546",
    appId: "1:920459035546:web:75e7f27a9bdfceb2b1f023",
    measurementId: "G-H04EPWSHVF"
  }

const firebaseapp = initializeApp(firebaseConfig)