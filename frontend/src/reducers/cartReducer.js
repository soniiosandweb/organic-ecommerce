import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, TOTAL_AMOUNT } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], totalAmount: null }, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            const item = payload;
            const isItemExist = state.cartItems.find((el) => el.product === item.product);

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((el) =>
                        el.product === isItemExist.product ? item : el
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((el) => el.product !== payload)
            }
        case EMPTY_CART:
            return {
                ...state,
                cartItems: [],
                totalAmount: null,
            }
        case TOTAL_AMOUNT:
            return {
                ...state,
                totalAmount: payload,
            }
        default:
            return state;
    }
}