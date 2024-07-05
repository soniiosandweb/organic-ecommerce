import { ALL_FAQ_FAIL, ALL_FAQ_REQUEST, ALL_FAQ_SUCCESS, CLEAR_ERRORS, DELETE_FAQ_FAIL, DELETE_FAQ_REQUEST, DELETE_FAQ_RESET, DELETE_FAQ_SUCCESS, FAQ_DETAILS_FAIL, FAQ_DETAILS_REQUEST, FAQ_DETAILS_SUCCESS, NEW_FAQ_FAIL, NEW_FAQ_REQUEST, NEW_FAQ_RESET, NEW_FAQ_SUCCESS, REMOVE_FAQ_DETAILS, UPDATE_FAQ_FAIL, UPDATE_FAQ_REQUEST, UPDATE_FAQ_RESET, UPDATE_FAQ_SUCCESS } from "../constants/faqConstants";

// New Coupon Reducer
export const newFaqReducer = (state = { faq: {} }, { type, payload }) => {
    switch (type) {
        case NEW_FAQ_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_FAQ_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                faq: payload.faq,
            };
        case NEW_FAQ_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_FAQ_RESET:
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

// All FAQ Reducer
export const allFaqReducer = ( state = { faqs: [] }, { type, payload }) => {
    switch (type) {
        case ALL_FAQ_REQUEST:
            return {
                loading: true,
            };
        case ALL_FAQ_SUCCESS:
            return {
                loading: false,
                faqs: payload,
            }
        case ALL_FAQ_FAIL:
            return {
                loading: false,
                error: payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

export const faqReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_FAQ_REQUEST:
        case DELETE_FAQ_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_FAQ_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case DELETE_FAQ_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case UPDATE_FAQ_FAIL:
        case DELETE_FAQ_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_FAQ_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_FAQ_RESET:
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

export const faqDetailsReducer = (state = { faq: {} }, { type, payload }) => {
    switch (type) {
        case FAQ_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FAQ_DETAILS_SUCCESS:
            return {
                loading: false,
                faq: payload,
            };
        case FAQ_DETAILS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case REMOVE_FAQ_DETAILS:
            return {
                ...state,
                faq: {},
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