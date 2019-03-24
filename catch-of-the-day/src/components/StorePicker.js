import React from 'react';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
    
    constructor(props) {
        super(props);
        this.input = React.createRef();
        console.log(this);
      }   
    
    goToStore = event => {
        event.preventDefault();
        const storeName = this.input.current.value;
        this.props.history.push(`/store/${storeName}`);
    };
    
    render() {
        return (
        <form className="store-selector" onSubmit={this.goToStore}>
            <h2>Please Enter A Store</h2>
            <input 
                type="text" 
                ref={this.input}
                required 
                placeholder="Store Name"
                defaultValue={getFunName()}
                 />
            <button type="submit">Visit Store</button>
        </form>
        )
    }
}

export default StorePicker;