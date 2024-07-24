import { GET_SHIPPING_FAIL, GET_SHIPPING_REQUEST, GET_SHIPPING_SUCCESS, CLEAR_ERRORS, NEW_SHIPPING_REQUEST, NEW_SHIPPING_SUCCESS, NEW_SHIPPING_FAIL, NEW_SHIPPING_RESET, UPDATE_SHIPPING_REQUEST, UPDATE_SHIPPING_SUCCESS, UPDATE_SHIPPING_FAIL, UPDATE_SHIPPING_RESET } from "../constants/shippingConstants";

export const addressReducer = (state = { addressInfo: {} }, { type, payload }) => {

    switch (type) {
        case GET_SHIPPING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_SHIPPING_SUCCESS:
            return {
                loading: false,
                addressInfo: payload,
            };
        case GET_SHIPPING_FAIL:
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
}

// New Shipping Address Reducer
export const addShippingReducer = (state = { shipping: {} }, { type, payload }) => {
    switch (type) {
        case NEW_SHIPPING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_SHIPPING_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                shipping: payload.blog,
            };
        case NEW_SHIPPING_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_SHIPPING_RESET:
            return {
                ...state,
                success: false,
                shipping: {},
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

// Shipping Address Reducer
export const shippingReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_SHIPPING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_SHIPPING_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case UPDATE_SHIPPING_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_SHIPPING_RESET:
            return {
                ...state,
                isUpdated: false,
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
