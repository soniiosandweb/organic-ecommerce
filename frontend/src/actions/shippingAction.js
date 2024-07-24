import axios from "axios";
import { GET_SHIPPING_FAIL, GET_SHIPPING_REQUEST, GET_SHIPPING_SUCCESS, NEW_SHIPPING_FAIL, NEW_SHIPPING_REQUEST, NEW_SHIPPING_SUCCESS, UPDATE_SHIPPING_FAIL, UPDATE_SHIPPING_REQUEST, UPDATE_SHIPPING_SUCCESS, CLEAR_ERRORS } from "../constants/shippingConstants";

// Get Address Details
export const getAddressDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_SHIPPING_REQUEST });

        const { data } = await axios.get(`/api/v1/shipping/${id}`);

        dispatch({
            type: GET_SHIPPING_SUCCESS,
            payload: data.shipping,
        });
    } catch (error) {
        dispatch({
            type: GET_SHIPPING_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Add Shipping Address
export const createShipping = (addressData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_SHIPPING_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/address/add`, addressData, config);

        dispatch({
            type: NEW_SHIPPING_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_SHIPPING_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update Shipping Address
export const updateShipping = (id, addressData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SHIPPING_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/address/${id}`, addressData, config);

        dispatch({
            type: UPDATE_SHIPPING_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_SHIPPING_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}