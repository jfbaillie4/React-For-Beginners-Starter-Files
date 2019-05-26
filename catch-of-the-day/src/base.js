import * as firebase from "firebase/app";

import Rebase from 're-base'; 
import "firebase/performance";
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyAaEqAMAP3rtDq28u48haK6pVqQfGSWbS4",
        authDomain: "catch-of-the-day-james-b.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-james-b.firebaseio.com",
        projectId: "catch-of-the-day-james-b",
        storageBucket: "catch-of-the-day-james-b.appspot.com",
        messagingSenderId: "535158278417",
        appId: "1:535158278417:web:bfa65254b0dc4a77"
});

const base = Rebase.createClass(firebaseApp.database());

const perf = firebase.performance();

export { perf }

export { firebaseApp };

export default base;