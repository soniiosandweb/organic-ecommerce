import axios from "axios"
import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO, TOTAL_AMOUNT } from "../constants/cartConstants";
import { EMPTY_COUPON_CODE } from "../constants/couponConstants";

// add to cart
export const addItemsToCart = (id, quantity = 1) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            cuttedPrice: data.product.cuttedPrice,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// remove cart item
export const removeItemsFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    });

    if((getState().cart.cartItems).length === 0){
        dispatch({ type: EMPTY_COUPON_CODE });

        localStorage.setItem('appliedCoupon', JSON.stringify(getState().appliedCode.appliedCoupon))
    }

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// empty cart
export const emptyCart = () => async (dispatch, getState) => {

    dispatch({ type: EMPTY_CART });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    dispatch({ type: EMPTY_COUPON_CODE });

    localStorage.setItem('appliedCoupon', JSON.stringify(getState().appliedCode.appliedCoupon))
}

export const setTotalAmount = (amount) => async (dispatch, getState) => {

    dispatch({ 
        type: TOTAL_AMOUNT,
        payload: amount,
     });

    localStorage.setItem('totalAmount', JSON.stringify(getState().cart.totalAmount))
}

// save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem('shippingInfo', JSON.stringify(data));
}