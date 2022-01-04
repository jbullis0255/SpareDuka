import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/metaData";
import Loader from "../layout/Loader";
import SellerSidebar from "../seller/SellerSidebar"

import {useDispatch, useSelector} from "react-redux";

import {getSellerProducts} from "../../actions/productActions"
import { sellerOrder } from "../../actions/orderActions";
// import { getAllUsers } from "../../actions/userActions";

const SellerDashboard = () => { 
  const dispatch = useDispatch()

  const {sellerProducts} = useSelector(state => state.products)
  const {users} = useSelector(state => state.allUsers)
  const {sellerOrders, totalAmount, loading} = useSelector((state => state.allOrders))

  let outOfStock = 0;
  sellerProducts && sellerProducts.forEach(product => {
    if(product.stock===0){
      outOfStock += 1
    }
  })

  useEffect(() => {
    dispatch(getSellerProducts())
    dispatch(sellerOrder())
    // dispatch(getAllUsers())
  },[dispatch])

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <SellerSidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>

          {loading ? <Loader/> : (
            <Fragment>
              <MetaData title={"Seller Dashboard"}/>

              <div className="row pr-4">
            <div className="col-xl-12 col-sm-12 mb-3">
              <div className="card text-white bg-primary o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Total Amount
                    <br /> <b>UGX {totalAmount && totalAmount.toLocaleString()}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row pr-4">
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Products
                    <br /> <b>{sellerProducts && sellerProducts.length }</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/seller/products"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Orders
                    <br /> <b>{sellerOrders && sellerOrders.length }</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/seller/orders"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-info o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Users
                    <br /> <b>{users && users.length }</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/seller/users"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Out of Stock
                    <br /> <b>{outOfStock}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

            </Fragment>
          )}

         
        </div>
      </div>
    </Fragment>
  );
};

export default SellerDashboard;
