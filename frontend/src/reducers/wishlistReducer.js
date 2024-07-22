import { ADD_TO_WISHLIST, ADD_WISHLIST_ERROR, ADD_WISHLIST_REQUEST, ADD_WISHLIST_RESET, ADD_WISHLIST_SUCCESS, CLEAR_ERRORS, GET_WISHLIST_ERROR, GET_WISHLIST_REQUEST, GET_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";

export const wishlistReducer = (state = { wishlistItems: [] }, { type, payload }) => {
    switch (type) {
        case ADD_TO_WISHLIST:
            const item = payload;
            const itemExist = state.wishlistItems.find((i) => i.product === item.product);

            if (itemExist) {
                return {
                    ...state,
                    wishlistItems: state.wishlistItems.map((i) =>
                        i.product === itemExist.product ? item : i
                    ),
                }
            } else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item],
                }
            }
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter((i) => i.product !== payload)
            }
        default:
            return state;
    }
}

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
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}