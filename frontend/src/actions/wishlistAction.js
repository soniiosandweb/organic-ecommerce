import axios from "axios";
import { ADD_WISHLIST_ERROR, ADD_WISHLIST_REQUEST, ADD_WISHLIST_SUCCESS, CLEAR_ERRORS, GET_WISHLIST_ERROR, GET_WISHLIST_REQUEST, GET_WISHLIST_SUCCESS, REMOVE_WISHLIST_FAIL, REMOVE_WISHLIST_REQUEST, REMOVE_WISHLIST_SUCCESS } from "../constants/wishlistConstants";

// Add Item to Wishlist
export const addWishlistItem = (wishlistData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_WISHLIST_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/wishlist/new`, wishlistData, config);

        dispatch({
            type: ADD_WISHLIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADD_WISHLIST_ERROR,
            payload: error.response.data.message,
        });
    }
}

// Get WIshlists Items
export const getWIshlistItems = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_WISHLIST_REQUEST });

        const { data } = await axios.get(`/api/v1/wishlist/${id}`);

        dispatch({
            type: GET_WISHLIST_SUCCESS,
            payload: data.wishlist,
        });
    } catch (error) {
        dispatch({
            type: GET_WISHLIST_ERROR,
            payload: error.response.data.message,
        });
    }
};

// Delete WIshlist Item
export const deleteWishlist = (id) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_WISHLIST_REQUEST });
        const { data } = await axios.delete(`/api/v1/wishlist/delete/${id}`);

        dispatch({
            type: REMOVE_WISHLIST_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: REMOVE_WISHLIST_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}