import React from "react";

class AddFishForm extends React.Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.priceRef = React.createRef();
        this.statusRef = React.createRef();
        this.descRef = React.createRef();
        this.imageRef = React.createRef();
    }  
    
      
    createFish = e => {
        e.preventDefault();
        const fish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value,
        };
        this.props.addFish(fish);
        e.currentTarget.reset();
    };
    
    render() {
        return (
            <form className="fish-edit" onSubmit={this.createFish}>
                <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
                <input name="price" ref={this.priceRef} type="text" placeholder="Price" />
                <select name="status" ref={this.statusRef}>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea name="desc" ref={this.descRef} placeholder="Desc" />
                <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
                <button type="submit">Add Fish</button>
            </form>
        )
    }
}

export default AddFishForm;