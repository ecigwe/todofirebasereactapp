

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCKtwyjU5cX1Q13S5TzDhemacrPcjkdeQw",
    authDomain: "todoapp-97362.firebaseapp.com",
    databaseURL: "https://todoapp-97362.firebaseio.com",
    projectId: "todoapp-97362",
    storageBucket: "todoapp-97362.appspot.com",
    messagingSenderId: "1088228713931",
    appId: "1:1088228713931:web:805dc9101dfcf0061d824e",
    measurementId: "G-KNSTR1NDH8"
})

const db = firebaseApp.firestore();
export {
    db
}