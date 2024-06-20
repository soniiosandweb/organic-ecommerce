import { ALL_CATEGORY_FAIL, ALL_CATEGORY_REQUEST, ALL_CATEGORY_SUCCESS, CATEGORY_DETAILS_FAIL, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CLEAR_ERRORS, DELETE_CATEGORY_FAIL, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_RESET, DELETE_CATEGORY_SUCCESS, LIMIT_CATEGORY_FAIL, LIMIT_CATEGORY_REQUEST, LIMIT_CATEGORY_SUCCESS, NEW_CATEGORY_FAIL, NEW_CATEGORY_REQUEST, NEW_CATEGORY_RESET, NEW_CATEGORY_SUCCESS, REMOVE_CATEGORY_DETAILS, UPDATE_CATEGORY_FAIL, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_RESET, UPDATE_CATEGORY_SUCCESS } from "../constants/categoryConstants";

// New Product Reducer
export const newCategoryReducer = (state = { category: {} }, { type, payload }) => {
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
                category: payload.categories,
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

export const allCategoriesReducer = (state = { categories: [] }, { type, payload }) => {
    switch (type) {
        case ALL_CATEGORY_REQUEST:
            return {
                loading: true,
            };
        case ALL_CATEGORY_SUCCESS:
            return {
                loading: false,
                categories: payload,
            };
        case ALL_CATEGORY_FAIL:
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

export const limitCategoriesReducer = (state = { limitCategories: [] }, { type, payload }) => {
    switch (type) {
        case LIMIT_CATEGORY_REQUEST:
            return {
                loading: true,
            };
        case LIMIT_CATEGORY_SUCCESS:
            return {
                loading: false,
                limitCategories: payload,
            };
        case LIMIT_CATEGORY_FAIL:
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

export const categoryReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case UPDATE_CATEGORY_FAIL:
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_CATEGORY_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_CATEGORY_RESET:
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

export const categoryDetailsReducer = (state = { category: {} }, { type, payload }) => {
    switch (type) {
        case CATEGORY_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CATEGORY_DETAILS_SUCCESS:
            return {
                loading: false,
                category: payload,
            };
        case CATEGORY_DETAILS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case REMOVE_CATEGORY_DETAILS:
            return {
                ...state,
                category: {},
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