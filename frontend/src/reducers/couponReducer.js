import { ALL_COUPON_FAIL, ALL_COUPON_REQUEST, ALL_COUPON_SUCCESS, CLEAR_ERRORS, COUPON_DETAILS_FAIL, COUPON_DETAILS_REQUEST, COUPON_DETAILS_SUCCESS, DELETE_COUPON_FAIL, DELETE_COUPON_REQUEST, DELETE_COUPON_RESET, DELETE_COUPON_SUCCESS, NEW_COUPON_FAIL, NEW_COUPON_REQUEST, NEW_COUPON_RESET, NEW_COUPON_SUCCESS, REMOVE_COUPON_DETAILS, UPDATE_COUPON_FAIL, UPDATE_COUPON_REQUEST, UPDATE_COUPON_RESET, UPDATE_COUPON_SUCCESS } from "../constants/couponConstants";

// New Coupon Reducer
export const newCouponReducer = (state = { coupon: {} }, { type, payload }) => {
    switch (type) {
        case NEW_COUPON_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_COUPON_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                coupon: payload.coupons,
            };
        case NEW_COUPON_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_COUPON_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const allCouponsReducer = (state = { coupons: [] }, { type, payload }) => {
    switch (type) {
        case ALL_COUPON_REQUEST:
            return {
                loading: true,
            };
        case ALL_COUPON_SUCCESS:
            return {
                loading: false,
                coupons: payload,
            };
        case ALL_COUPON_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const couponReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_COUPON_REQUEST:
        case DELETE_COUPON_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_COUPON_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case DELETE_COUPON_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case UPDATE_COUPON_FAIL:
        case DELETE_COUPON_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_COUPON_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_COUPON_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const couponDetailsReducer = (state = { coupon: {} }, { type, payload }) => {
    switch (type) {
        case COUPON_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case COUPON_DETAILS_SUCCESS:
            return {
                loading: false,
                coupon: payload,
            };
        case COUPON_DETAILS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case REMOVE_COUPON_DETAILS:
            return {
                ...state,
                coupon: {},
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};