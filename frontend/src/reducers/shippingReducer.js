import { GET_SHIPPING_FAIL, GET_SHIPPING_REQUEST, GET_SHIPPING_SUCCESS, CLEAR_ERRORS, NEW_SHIPPING_REQUEST, NEW_SHIPPING_SUCCESS, NEW_SHIPPING_FAIL, NEW_SHIPPING_RESET, UPDATE_SHIPPING_REQUEST, DELETE_SHIPPING_REQUEST, UPDATE_SHIPPING_SUCCESS, DELETE_SHIPPING_SUCCESS, UPDATE_SHIPPING_FAIL, DELETE_SHIPPING_FAIL, UPDATE_SHIPPING_RESET, DELETE_SHIPPING_RESET } from "../constants/shippingConstants";


export const addressReducer = (state = { address: {} }, { type, payload }) => {

    switch (type) {
        case GET_SHIPPING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_SHIPPING_SUCCESS:
            return {
                loading: false,
                address: payload,
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
        case DELETE_SHIPPING_REQUEST:
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
        case DELETE_SHIPPING_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case UPDATE_SHIPPING_FAIL:
        case DELETE_SHIPPING_FAIL:
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
        case DELETE_SHIPPING_RESET:
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
}
