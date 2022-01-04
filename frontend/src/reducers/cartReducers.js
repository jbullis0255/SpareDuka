import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_DELIVERY_INFO} from '../constants/cartConstants'

export const cartReducer = (state ={cartItems:[],deliveryInfo :{} }, action) =>{
    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload

            const isItemExist = state.cartItems.find(i => i.product === item.product)

            if(isItemExist){
                return{
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_CART_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }

        case SAVE_DELIVERY_INFO:
            return{
                ...state,
                deliveryInfo: action.payload
            }

        default:
            return state
    }
}