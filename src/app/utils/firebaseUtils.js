import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyARS_jYd0lEkUG6eLvc0kguW4U1Ev0lcZ8",
    authDomain: "firetest-3429a.firebaseapp.com",
    databaseURL: "https://firetest-3429a.firebaseio.com",
    projectId: "firetest-3429a",
    storageBucket: "firetest-3429a.appspot.com",
    messagingSenderId: "116525195359"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();

export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider.PROVIDER_ID;