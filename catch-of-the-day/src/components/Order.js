import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";


class Order extends React.Component {
    
    static propTypes = {
        deleteFromOrder: PropTypes.func,
        order: PropTypes.object,
        fishes: PropTypes.object,
    }

    renderOrder = key => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: {enter: 500, exit: 500}
        };
        if (!fish) return null;
        // Make sure the fish is loaded before we continue. 
        if(!isAvailable) {
            return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    Sorry {fish ? fish.name : 'fish'} is no longer available
                </li>
            </CSSTransition>
            );
        }
        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }}>
                            <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name}
                        {formatPrice(count * fish.price)}
                        <button onClick={()=>(this.props.deleteFromOrder(key))}>Remove</button>
                    </span>
                </li>
            </CSSTransition>
        );
    };
    
    render() {
        const orderIDs = Object.keys(this.props.order);
        const total = orderIDs.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);
        return (
             <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIDs.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
                <ul> 
                    <li></li>
                </ul>
             </div>
        )
    }
}

export default Order;