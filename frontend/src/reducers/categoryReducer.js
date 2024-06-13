import { CLEAR_ERRORS, NEW_CATEGORY_FAIL, NEW_CATEGORY_REQUEST, NEW_CATEGORY_RESET, NEW_CATEGORY_SUCCESS } from "../constants/categoryConstants";

// New Product Reducer
export const newCategoryReducer = (state = { categories: {} }, { type, payload }) => {
    switch (type) {
        case NEW_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                categories: payload.categories,
            };
        case NEW_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_CATEGORY_RESET:
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