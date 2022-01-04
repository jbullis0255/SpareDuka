import axios from 'axios'
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_DELIVERY_INFO} from '../constants/cartConstants'

export const addItemsToCart = (id, quantity) =>  async (dispatch, getState) =>{
    const {data} = await axios.get(`/api/v1/product/${id}`)
 
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product:data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            seller: data.product.seller,
            quantity
        }
    })

    //save cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removeItemFromCart = (id) =>  async (dispatch, getState) =>{

    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id
    })

    //save cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveDeliveryInfo = (data) =>  async (dispatch) =>{

    dispatch({
        type: SAVE_DELIVERY_INFO,
        payload: data
    })

    //save cart items to local storage
    localStorage.setItem('deliveryInfo', JSON.stringify(data))
}