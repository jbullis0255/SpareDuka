import React, { Fragment, useEffect} from "react";

import CheckoutOrder from "./CheckoutOrder";

import axios from 'axios'

import Loader from "../layout/Loader";
import MetaData from "../layout/metaData";

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import { useSelector, useDispatch } from "react-redux";
import {useAlert} from 'react-alert'

import {clearErrors, createOrder,orderEmail} from "../../actions/orderActions"

const Payment = ({history}) => {

  const dispatch = useDispatch()
  const alert = useAlert()

  const { user } = useSelector((state) => state.auth);
  const { cartItems, deliveryInfo } = useSelector((state) => state.cart);
  const {error } = useSelector((state) => state.newOrder)

  
  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
  
  },[dispatch,alert, error])

  const order= {
    orderItems: cartItems,
    deliveryInfo
  }
 
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
 
  if(orderInfo){
    order.itemsPrice = orderInfo.itemsPrice
    order.deliveryPrice = orderInfo.deliveryPrice
    order.taxPrice = orderInfo.taxPrice
    order.totalPrice= orderInfo.totalPrice
  }


  const config = {
    public_key: process.env.REACT_APP_FW_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: 500,
    currency: 'UGX',
    country: 'UG',
    payment_options: 'card,mobilemoney,ussd',
    redirect_url:process.env.REACT_APP_REDIRECT_URL,
    customer: {
        email: user.email,
        phonenumber: user.phoneNo,
        name: user.name,
    },
    customizations: {
        title: 'SpareDuka.com',
        description: 'Payment for items in cart',
        logo: 'https://res.cloudinary.com/emmatechs/image/upload/v1629268692/logo/logo_szyhhi.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);


  return (
    <Fragment>
      <MetaData title={"Payment Info"} />

      <CheckoutOrder deliver confirmOrder payment/>

       
      <div className="row wrapper App">
		<div className="col-10 col-lg-5">
        <button
        type="submit"
        id="pay_btn"
        className="btn btn-block py-3"
        onClick={ (response)=> {
          
          if (response) {
            order.paymentInfo ={
                    id: Date.now(),
                    status: 'success'
                  }
                  dispatch(createOrder(order))

          } else {
              history.push('/')
          }
          handleFlutterPayment({
            callback: () => {
              
               console.log(response);
                closePaymentModal() // this will close the modal programmatically

            },
            onClose: () => {},

            
          });
        }}
      >
        Pay UGX {(orderInfo && orderInfo.totalPrice).toLocaleString()}

      </button>
      <button  id="pay_btn"
      type="submit"
        className="btn btn-block py-3"
        onClick={ (response)=> {
        if (response) {
          order.paymentInfo ={
                  status: 'pOnDelivery'
                }
                dispatch(createOrder(order))
              history.push('/success')

        } else {
            history.push('/')
        }
      }}
      >
            Pay on delivery
        </button>
      <button  id="pay_btn"
      type="submit"
        className="btn btn-block py-3"
        onClick={ (response)=> {
        if (response) {
          order.paymentInfo ={
                  status: 'pickupfromstore'
                }
                dispatch(createOrder(order))
              history.push('/success')

        } else {
            history.push('/')
        }
      }}
      >
            Pick from Shop
        </button>
      </div>
      </div>
   

    </Fragment>
  );
};

export default Payment;
