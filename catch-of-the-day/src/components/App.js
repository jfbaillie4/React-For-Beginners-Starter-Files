import React from "react";
import PropTypes from "prop-types";
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes'
import Fish from "./Fish";
import base from "../base"
import { logPageView, logEvent, initGA } from "../tracking";


class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    };

    static protoTypes = {
        match: PropTypes.object
    };

    componentDidMount() {
        const {params} = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
        initGA();
        logPageView();
        logEvent({category: 'Loads', action: 'App Load', label: this.props.match.params.storeId})
    };

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }


    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    
    addFish = (fish) => {
        //1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        //2. add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //3. Set the new fishes object to state
        this.setState({
            fishes: fishes
        });
    };

    updateFish = (key, updatedFish) => {
        //1. Take a copy of existing state
        const fishes = {...this.state.fishes};
        // 2. Add updated fish to fishes
        fishes[key] = updatedFish;
        // 3. update state with new fishes
        this.setState({ fishes })
    }

    deleteFish = (key) => {
        //1. Take a copy of state
        const fishes = {...this.state.fishes};
        // 2. update the state
        fishes[key] = null;
        // 3. update state
        this.setState({fishes})

    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes })
        logEvent({category: 'Admin Actions', action: 'Load Sample Fish', label: this.props.match.params.storeId})
    };

    addToOrder = (key) => {
        //1. take a copy of state.
        const order = {...this.state.order};
        //2. Either add to the order or update the number.
        order[key] = order[key] + 1 || 1;
        //3. Call setState to update our state object
        this.setState({order});
    }

    deleteFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish 
                                key={key} 
                                index={key} 
                                details={this.state.fishes[key]} 
                                addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order 
                    deleteFromOrder={this.deleteFromOrder} 
                    fishes={this.state.fishes} 
                    order={this.state.order} 
                />
                <Inventory 
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeID={this.props.match.params.storeId}
                />
            </div>
        
        )
    }
}

export default App;