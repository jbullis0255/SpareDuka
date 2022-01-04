import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/metaData'

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from "react-redux";
import {addItemsToCart,removeItemFromCart} from '../../actions/cartActions'

const Cart = ({history}) =>{
    
    const dispatch = useDispatch()

    const {cartItems} = useSelector(state =>state.cart)

    const removeCartItem =(id)=>{
        dispatch(removeItemFromCart(id))

    }

    const increaseQty = (id, quantity, stock) =>{
        const newQty = quantity + 1

        if(newQty > stock) return;
            dispatch(addItemsToCart(id, newQty))
        

    }
    const decreaseQty = (id, quantity) =>{
        const newQty = quantity - 1
        if(newQty <= 0) return;
            dispatch(addItemsToCart(id,newQty))
        

    }

    const checkOutHandler =()=>{
        history.push('/login?redirect=delivery')
    }

    return(
        <Fragment>
            <MetaData title={'Your Cart'}/>
            {cartItems.length ===0 ? <h2 className="mt-5">Your Cart is Empty</h2> : (
                <Fragment>

<h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
               
               {cartItems.map(item => (
                   <Fragment>
                       <hr/>

                       <div className="cart-item" key={item.product}>
                    <div className="row" key={item.image}>
                        <div className="col-4 col-lg-3" >
                            <img src={item.image} alt="Laptop" height="90" width="115"/>
                        </div>

                        <div className="col-5 col-lg-3" key={item.name}>
                            <Link to={`/product/${item.product}`}>{item.name}</Link><br/><br/>
                            <Link to={`/sellers}`}>Seller: {item.seller}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0 " key={item.price}>
                            <p id="card_item_price">UGX {item.price.toLocaleString()}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0" >
                            <div className="stockCounter d-inline" key={item.quantity}>
                                <span className="btn btn-danger minus"  onClick={()=> decreaseQty(item.product,item.quantity)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus"  onClick={()=> increaseQty(item.product,item.quantity, item.stock)}>+</span>
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0" key={item.product}>
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=> removeCartItem(item.product)}></i>
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
                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) =>
                     (acc + Number(item.quantity)),0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values" id="est-total">UGX {cartItems.reduce((acc, item) => 
                    acc + item.quantity* item.price ,0).toLocaleString()}</span></p>
    
                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkOutHandler}>Check out</button>
                </div>
            </div>
        </div>

                </Fragment>
            ) } 
        </Fragment>
    )
}

export default Cart