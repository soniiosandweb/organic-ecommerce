import { ADD_WISHLIST_ERROR, ADD_WISHLIST_REQUEST, ADD_WISHLIST_RESET, ADD_WISHLIST_SUCCESS, CLEAR_ERRORS, GET_WISHLIST_ERROR, GET_WISHLIST_REQUEST, GET_WISHLIST_RESET, GET_WISHLIST_SUCCESS, REMOVE_WISHLIST_FAIL, REMOVE_WISHLIST_REQUEST, REMOVE_WISHLIST_RESET, REMOVE_WISHLIST_SUCCESS } from "../constants/wishlistConstants";

export const addWishlistsReducer = (state = { wishlist: [] }, { type, payload }) => {
    switch (type) {
        case ADD_WISHLIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_WISHLIST_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                wishlist: payload.wishlist,
            };
        case ADD_WISHLIST_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case ADD_WISHLIST_RESET:
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

export const wishlistsReducer = (state = { wishlists: [] }, { type, payload }) => {

    switch (type) {
        case GET_WISHLIST_REQUEST:
            return {
                loading: true,
                wishlists: [],
            };
        case GET_WISHLIST_SUCCESS:
            return {
                loading: false,
                wishlists: payload,
            };
        case GET_WISHLIST_ERROR:
            return {
                loading: false,
                error: payload,
            };
        case GET_WISHLIST_RESET:
            return {
                ...state,
                loading: undefined,
                wishlists: [],
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

// Blog Reducer
export const removeWishlistReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case REMOVE_WISHLIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REMOVE_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case REMOVE_WISHLIST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case REMOVE_WISHLIST_RESET:
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