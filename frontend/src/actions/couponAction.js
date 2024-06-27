import axios from "axios";
import { ADMIN_COUPON_FAIL, ADMIN_COUPON_REQUEST, ADMIN_COUPON_SUCCESS, ALL_COUPON_FAIL, ALL_COUPON_REQUEST, ALL_COUPON_SUCCESS, CLEAR_ERRORS, COUPON_CODE, COUPON_DETAILS_FAIL, COUPON_DETAILS_REQUEST, COUPON_DETAILS_SUCCESS, DELETE_COUPON_FAIL, DELETE_COUPON_REQUEST, DELETE_COUPON_SUCCESS, EMPTY_COUPON_CODE, NEW_COUPON_FAIL, NEW_COUPON_REQUEST, NEW_COUPON_SUCCESS, UPDATE_COUPON_FAIL, UPDATE_COUPON_REQUEST, UPDATE_COUPON_SUCCESS } from "../constants/couponConstants";


// New Coupon ---ADMIN
export const createCoupon = (couponData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_COUPON_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/admin/coupon/add`, couponData, config);

        dispatch({
            type: NEW_COUPON_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Get All Coupons
export const getAllCouponsAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_COUPON_REQUEST });

        const { data } = await axios.get("/api/v1/allcoupons");

        dispatch({
            type: ADMIN_COUPON_SUCCESS,
            payload: data.coupons,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Coupons
export const getAllCoupons = (userID) => async (dispatch) => {
    try {
        dispatch({ type: ALL_COUPON_REQUEST });

        const { data } = await axios.get(`/api/v1/coupons/${userID}`);

        dispatch({
            type: ALL_COUPON_SUCCESS,
            payload: data.coupons,
        })

    } catch (error) {
        dispatch({
            type: ALL_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Coupon Details
export const getCouponDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: COUPON_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/coupon/${id}`);

        dispatch({
            type: COUPON_DETAILS_SUCCESS,
            payload: data.coupons,
        })

    } catch (error) {
        dispatch({
            type: COUPON_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Coupon ---ADMIN
export const updateCoupon = (id, couponData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_COUPON_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`/api/v1/admin/coupon/${id}`, couponData, config);

        dispatch({
            type: UPDATE_COUPON_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Coupon ---ADMIN
export const deleteCoupon = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_COUPON_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/coupon/${id}`);

        dispatch({
            type: DELETE_COUPON_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: DELETE_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Set coupon code
export const setCouponCode = (coupon) => (dispatch, getState) => {
    dispatch({ 
        type: COUPON_CODE,
        payload: coupon,
    });

    localStorage.setItem('appliedCoupon', JSON.stringify(getState().appliedCode.appliedCoupon));
}

// Remove coupon code
export const emptyCouponCode = () => async (dispatch, getState) => {

    dispatch({ type: EMPTY_COUPON_CODE });

    localStorage.setItem('appliedCoupon', JSON.stringify(getState().appliedCode.appliedCoupon))
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}