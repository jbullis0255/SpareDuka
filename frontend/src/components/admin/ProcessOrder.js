import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/metaData";

import SideBar from "./SideBar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";

import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = ({ match, history }) => {
  const [status, setStatus] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, order={} } = useSelector((state) => state.orderDetails);
  const {
    deliveryInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order
  const { error, isUpdated } = useSelector((state) => state.order);

  const orderId = match.params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, orderId]);

  const updateOrderHandler = (id) => {
    const formData = new FormData();

    formData.set("status", status);

    dispatch(updateOrder(id, formData));
  };

  const deliveryDetails =
    deliveryInfo &&
    `${deliveryInfo.address}, ${deliveryInfo.town} ,
       ${deliveryInfo.postalCode}, ${deliveryInfo.street}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "success" ? true : false;

    const mapsSearch = (e) =>{
        e.preventDefault()

        history.push('/map')
    }
  return (
    <Fragment>
      <MetaData title={`Process Orders # ${ order && order._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div class="row d-flex justify-content-around">
                <div class="col-12 col-lg-7 order-details">
                  <h3 class="my-5">Order # {order._id}</h3>

                  <h4 class="mb-4">Delivery Info</h4>
                  <p>
                    <b>Name: </b> {user && user.name}
                  </p>
                  <p>
                    <b>Phone: </b> {deliveryInfo && deliveryInfo.phoneNo}
                  </p>
                  <p class="mb-4">
                    <b>Address: </b>
                    {deliveryDetails}
                  </p>
                  <p>
                    <b>Amount:</b>UGX {totalPrice}
                  </p>

                  <hr />

                  <h4 className="my-4">Payment</h4>
                  <p className={isPaid ? "greenColor" : "redColor"}>
                    <b>{isPaid ? "PAID" : "NOT PAID/Payment on delivery"} </b>
                  </p>

                  <h4 className="my-4">Payment ID</h4>
                  <p>
                    <b>{paymentInfo && paymentInfo.id}</b>
                  </p>

                  <h4 className="my-4">Order Status:</h4>
                  <p
                    className={
                      order.orderStatus &&
                      String(order.orderStatus).includes("Delivered")
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    <b>{orderStatus}</b>
                  </p>
                 
                  <h4 className="my-4">Order Items:</h4>

                  <hr />

                  <div className="cart-item my-1">

                    {orderItems &&
                      orderItems.map((item) => (
                        <div key={item.product} className="row my-5">
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>UGX {item.price.toLocaleString()}</p>
                          </div>

                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>{item.quantity} Piece (s)</p>
                          </div>
                        </div>
                      ))}

                  </div>
                  <hr />
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  <div className="form-group">
                    <select className="form-control" 
                    name="status" value={status}
                    onChange={e => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Delivering">Delivering</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <button className="btn btn-primary btn-block" 
                   onClick={()=> updateOrderHandler(order._id)}
                  >
                    Update Status
                  </button> 
                  
                  <h4 className="my-4">Search Location</h4>
                    <button className="btn btn-block" id="maps_btn" onClick={mapsSearch}>
                      Search
                    </button>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
