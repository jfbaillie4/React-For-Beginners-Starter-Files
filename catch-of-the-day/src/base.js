import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyAaEqAMAP3rtDq28u48haK6pVqQfGSWbS4",
        authDomain: "catch-of-the-day-james-b.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-james-b.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;