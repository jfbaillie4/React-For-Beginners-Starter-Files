import React from "react";
import PropTypes from "prop-types";
import firebase from 'firebase/app';
import "firebase/auth";
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from "./Login";
import base, { firebaseApp } from "../base";


class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        addFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
    };

    state = {
        uid: null,
        owner: null,
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user});
            }
        })
    }

    authHandler = async (authData) => {
        // 1. Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeID, {context: this});
        // 2. Claim it if there is no owner
        if (!store.owner) {
            await base.post(`${this.props.storeID}/owner`, {
                data: authData.user.uid
            })
        }
        // 3. Set the sate of the inventory component to reflect the current user.
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid,
        })
    }
    
    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler)
            .catch( error => {
                if (error.code === 'auth/account-exists-with-different-credential') {
                       const nonGoogleCred = error.credential;
                       var googleProvider = new firebase.auth.GoogleAuthProvider();
                       googleProvider.setCustomParameters({'login_hint': error.email});
                       alert("It looks like there is already an account associated with your email address. Please login using Google.")
                       return firebase.auth().signInWithPopup(googleProvider)
                          .then(function(result) {
                            return result.user.linkWithCredential(nonGoogleCred);
                          });
                    };
                    throw error
                });
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null });
    };

    render() {
        const logout = <button onClick={this.logout}>Log Out</button>
        // 1. Check if they are logged in.
        if (!this.state.uid) {
            this.view = "Login Presented"
            return <Login authenticate={this.authenticate} />;
        }
        // 2. check if they are not the owner of the store
        if (this.state.uid !== this.state.owner) {
            this.view = "Not Owner";
            return <div>
                <p>Sorry you are not the owner!</p>
                {logout}
            </div>
        }
        this.view = 'Inventory Shown';
        //3. They must be the owner, just render the inventtory
        return (
             <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm 
                    key={key} 
                    index={key}
                    fish={this.props.fishes[key]}
                    updateFish={this.props.updateFish}
                    deleteFish={this.props.deleteFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>
                    Load Sample Fishes
                </button>
             </div>
        )
    }
}

export default Inventory;