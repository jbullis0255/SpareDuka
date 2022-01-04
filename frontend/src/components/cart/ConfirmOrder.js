import React, { Fragment } from "react";
import {Link} from 'react-router-dom'

import CheckoutOrder from "./CheckoutOrder";


import Loader from "../layout/Loader";
import MetaData from "../layout/metaData";

import { useSelector } from "react-redux";


const ConfirmOrder = ({history}) => {

    const {cartItems , deliveryInfo} = useSelector((state =>state.cart))
    const {user} = useSelector((state =>state.auth))

    //calculate the items price
    const itemsPrice = cartItems.reduce((acc, item)=> acc + item.price * item.quantity, 0)
    const deliveryPrice = itemsPrice > 100000 ? 0 : 3000
    const taxPrice = Number((0.01 * itemsPrice).toFixed(2))
    const totalPrice =itemsPrice + deliveryPrice + taxPrice


    const processPayment =() =>{

        const data ={
            itemsPrice: itemsPrice,
            deliveryPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')

    }

    
    return (
        <Fragment>

            <MetaData title={"Confirm Order Info"} />
        
            <CheckoutOrder deliver confirmOrder/>

            <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Delivery Info</h4>
                <p><b>Name:  </b>{user && user.name}</p>
                <p><b>Phone:  </b>{deliveryInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:  </b>{deliveryInfo.address} , {deliveryInfo.town} , {deliveryInfo.postalCode}, {deliveryInfo.street}</p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>

                        {/* map through all your cart items */}
                    {cartItems.map(item=>(
                        <Fragment>
                            <hr />
                <div className="cart-item my-1" >
                    <div className="row" key={item.product}>
                        <div className="col-4 col-lg-2" key={item.image}>
                            <img src={item.image}  alt="Laptop" height="45" width="65"/>
                        </div>

                        <div className="col-5 col-lg-6" key={item.product}>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-4 mt-4 mt-lg-0 pl-1" key={item.quantity}>
                            <p>{item.quantity} x {item.price.toLocaleString()} = UGX {(item.quantity* item.price).toLocaleString()} <b></b></p>
                        </div>

                    </div>
                </div>
                <hr />
                        </Fragment>
                    ))}
                

            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">UGX {itemsPrice.toLocaleString()}</span></p>
                        <p>Delivery Price: <span className="order-summary-values">UGX {deliveryPrice.toLocaleString()}</span></p>
                        <p>Tax:  <span className="order-summary-values">UGX {taxPrice.toLocaleString()}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">UGX {totalPrice.toLocaleString()}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processPayment}>Proceed to Payment</button>
                    </div>
                </div>
			
			
        </div>
        
            
        </Fragment>
    )
}

export default ConfirmOrder
