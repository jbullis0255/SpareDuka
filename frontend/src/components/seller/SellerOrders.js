import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'

import {MDBDataTable} from 'mdbreact'

import Loader from '../layout/Loader'
import MetaData from '../layout/metaData'

import SellerSidebar from './SellerSidebar'

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from "react-redux";

import {sellerOrder, clearErrors} from "../../actions/orderActions"

// import { DELETE_ORDER_RESET } from '../../constants/orderConstants'


const SellerOrders = ({ history}) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const {loading, error, sellerOrders} = useSelector(state => state.allOrders)
    // const {isDeleted} = useSelector((state) => state.order)

    useEffect(()=>{
        dispatch(sellerOrder())

        if(error){
            alert.error(error)
            dispatch(clearErrors()) 
        }

        // if(isDeleted){
        //     alert.success('Order Deleted Successfully')
        //     history.push('/seller/orders')
        //     dispatch({ type: DELETE_ORDER_RESET})
        // }

    },[dispatch, alert, error,history])

    // const deleteOrderHandler= (id) =>{
    //     dispatch(deleteSellerOrder(id))
    // }

    const setOrders = () =>{
        const data ={
            columns: [ 
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'desc',
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'desc',
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'desc',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'desc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    
                },

            ],
            rows: []
        }
      
        sellerOrders && sellerOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems:order.orderItems.length,
                amount: `UGX ${order.totalPrice.toLocaleString()}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                            ? <p style={{color: 'green'}}>{order.orderStatus}</p>
                            :<p style={{color: 'red'}}>{order.orderStatus}</p>,
                actions: 
                <Fragment>
                    <Link className="btn btn-primary py-1 px-2" to={`/seller/order/${order._id}`}>
                        <i className="fa fa-eye"></i>
                        </Link>
                        {/* <button className="btn btn-danger py-1 px-2 ml-2"
                        onClick={() => deleteOrderHandler(order._id)} >
                        <i className="fa fa-trash"></i>
                        </button> */}
               </Fragment>       
            })
        })

        return data
    }


    return (
        <Fragment>
            <MetaData title={'Seller Orders'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <SellerSidebar />
                </div>

                <div className='col-12 col-md-10'>
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>

                        {loading ? <Loader/> :(
                                <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>

                </div>
            </div>
            
        </Fragment>
    )
}

export default SellerOrders
