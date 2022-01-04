import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {productsReducer,newProductsReducer,
    productReducer,productDetailsReducer,newReviewsReducer,
    getReviewsReducer,deleteReviewReducer} from './reducers/productReducers'
import {authReducer,userDetailsReducer, userReducer,forgotPasswordReducer,allUsersReducer} from './reducers/userReducers'
import {cartReducer} from './reducers/cartReducers'
import {newOrderReducer, myOrdersReducer, allOrdersReducer,orderDetailsReducer,orderReducer,orderEmailReducer} from './reducers/orderReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct:newProductsReducer, 
    product:productReducer,
    auth: authReducer,
    user: userReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrder : myOrdersReducer,
    orderDetails:orderDetailsReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    newReview: newReviewsReducer,
    productReviews:getReviewsReducer,
    review:deleteReviewReducer
})

let initialState = {
    cart:{
        cartItems:localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],

    deliveryInfo:localStorage.getItem('deliveryInfo')
    ? JSON.parse(localStorage.getItem('deliveryInfo'))
    : {}
    }
}

const middleware = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store