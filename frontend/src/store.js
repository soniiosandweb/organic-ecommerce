import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { forgotPasswordReducer, profileReducer, userReducer, allUsersReducer, userDetailsReducer, PaymentKeysReducer, allUsersOnlyReducer } from './reducers/userReducer';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer, productReviewsReducer, reviewReducer, userReviewsReducer, featuredProductsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { saveForLaterReducer } from './reducers/saveForLaterReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer, paymentAddReducer, paymentStatusReducer } from './reducers/orderReducer';
import { wishlistReducer } from './reducers/wishlistReducer';
import { contactReducer } from './reducers/contactReducer';
import { allCategoriesReducer, categoryDetailsReducer, categoryReducer, limitCategoriesReducer, newCategoryReducer } from './reducers/categoryReducer';
import { allAdminCouponsReducer, allCouponsReducer, couponDetailsReducer, couponReducer, newCouponReducer, setCouponCode } from './reducers/couponReducer';
import { allFaqReducer, faqDetailsReducer, faqReducer, newFaqReducer } from './reducers/faqReducer';
import { blogDetailsReducer, blogReducer, blogsReducer, latestBlogReducer, newBlogReducer, relatedBlogReducer } from './reducers/blogReducer';

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
    allAdminCoupons: allAdminCouponsReducer,
    coupon: couponReducer,
    couponDetails: couponDetailsReducer,
    appliedCode: setCouponCode,
    usersOnly: allUsersOnlyReducer,
    allFaqs: allFaqReducer,
    faqs: faqReducer,
    newFaq: newFaqReducer,
    faqDetails: faqDetailsReducer,
    blogs: blogsReducer,
    blogDetails: blogDetailsReducer,
    newBlog: newBlogReducer,
    blog: blogReducer,
    featured: featuredProductsReducer,
    latestBlog: latestBlogReducer,
    relatedBlog: relatedBlogReducer,
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
            : null,
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