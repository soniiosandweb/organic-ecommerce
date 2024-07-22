import axios from "axios";
import { ADD_TO_WISHLIST, ADD_WISHLIST_ERROR, ADD_WISHLIST_REQUEST, ADD_WISHLIST_SUCCESS, CLEAR_ERRORS, GET_WISHLIST_ERROR, GET_WISHLIST_REQUEST, GET_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";

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

// Add To Wishlist
export const addToWishlist = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_WISHLIST,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            cuttedPrice: data.product.cuttedPrice,
            image: data.product.images[0].url,
            ratings: data.product.ratings,
            reviews: data.product.numOfReviews,
        },
    });

    window.sessionStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}

// Remove From Wishlist
export const removeFromWishlist = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_WISHLIST,
        payload: id,
    });

    window.sessionStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}