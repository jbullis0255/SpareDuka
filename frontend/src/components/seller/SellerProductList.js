import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'

import {MDBDataTable} from 'mdbreact'

import Loader from '../layout/Loader'
import MetaData from '../layout/metaData'

import SellerSidebar from './SellerSidebar'

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from "react-redux";

import {getSellerProducts,deleteProduct, clearErrors} from "../../actions/productActions"

import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

const SellerProductList = ({history}) => { 
   
    const alert = useAlert()
    const dispatch = useDispatch()

    const {error: deleteError, isRemoved } = useSelector((state) => state.product)
    const {loading, error, sellerProducts} = useSelector(state => state.products)

    useEffect(()=>{
        dispatch(getSellerProducts())

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isRemoved){
            alert.success('Product Deleted Successfully')
            history.push('/seller/products')
            dispatch({ type: DELETE_PRODUCT_RESET})
        }
    },[dispatch, alert, error,deleteError,isRemoved,history])

    const setProducts = () =>{
        const data ={
            columns: [ 
                {
                    label: 'Product ID',
                    field: 'id',
                    sort: 'desc',
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'desc',
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'desc',
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'desc',
                },
                {
                    label: 'Seller',
                    field: 'seller',
                    sort: 'Seller'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    
                },

            ], 
            rows: []
        }

        sellerProducts && sellerProducts.forEach(product => {
            data.rows.push({
                id: product._id,
                name:product.name,
                price: `UGX ${product.price.toLocaleString()}`,
                stock: product.stock,
                seller: product.seller,
                actions: 
                <Fragment>
                    <Link className="btn btn-primary py-1 px-2" to={`/seller/product/${product._id}`}>
                        <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=>deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                        </button>
               </Fragment>       
            })
        })

        return data
    }


    const deleteProductHandler =(id)=>{
        dispatch(deleteProduct(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Products'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <SellerSidebar/>
                </div>

                <div className='col-12 col-md-10'>
                    <Fragment>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader/> :(
                                <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                            />
                        )}
                    </Fragment>

                </div>
            </div>
            
        </Fragment>
    )
}

export default SellerProductList
