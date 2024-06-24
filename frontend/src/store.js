import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { forgotPasswordReducer, profileReducer, userReducer, allUsersReducer, userDetailsReducer, PaymentKeysReducer } from './reducers/userReducer';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer, productReviewsReducer, reviewReducer, userReviewsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { saveForLaterReducer } from './reducers/saveForLaterReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer, paymentAddReducer, paymentStatusReducer } from './reducers/orderReducer';
import { wishlistReducer } from './reducers/wishlistReducer';
import { contactReducer } from './reducers/contactReducer';
import { allCategoriesReducer, categoryDetailsReducer, categoryReducer, limitCategoriesReducer, newCategoryReducer } from './reducers/categoryReducer';
import { allCouponsReducer, couponDetailsReducer, couponReducer, newCouponReducer, setCouponCode } from './reducers/couponReducer';

const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    cart: cartReducer,
    saveForLater: saveForLaterReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    paymentStatus: paymentStatusReducer,
    payment: paymentAddReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newProduct: newProductReducer,
    product: productReducer,
    users: allUsersReducer,
    userDetails: userDetailsReducer,
    reviews: productReviewsReducer,
    review: reviewReducer,
    userReviews: userReviewsReducer,
    wishlist: wishlistReducer,
    contactForm: contactReducer,
    newCategory: newCategoryReducer,
    allCategories: allCategoriesReducer,
    limitCategories: limitCategoriesReducer,
    category: categoryReducer,
    categoryDetails: categoryDetailsReducer,
    paymentKey: PaymentKeysReducer,
    newCoupon: newCouponReducer,
    allCoupons: allCouponsReducer,
    coupon: couponReducer,
    couponDetails: couponDetailsReducer,
    appliedCode: setCouponCode,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
        totalAmount: localStorage.getItem("totalAmount")
            ? JSON.parse(localStorage.getItem('totalAmount'))
            : {},
    },
    saveForLater: {
        saveForLaterItems: localStorage.getItem('saveForLaterItems')
            ? JSON.parse(localStorage.getItem('saveForLaterItems'))
            : [],
    },
    wishlist: {
        wishlistItems: localStorage.getItem('wishlistItems')
            ? JSON.parse(localStorage.getItem('wishlistItems'))
            : [],
    },
    appliedCode: {
        appliedCoupon: localStorage.getItem('appliedCoupon')
            ? JSON.parse(localStorage.getItem('appliedCoupon'))
            : {},
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;