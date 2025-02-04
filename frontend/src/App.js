import WebFont from 'webfontloader';
import Footer from './components/Layouts/Footer/Footer';
import Header from './components/Layouts/Header/Header';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loadPaymentKey, loadUser } from './actions/userAction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Account from './components/User/Account';
import ProtectedRoute from './Routes/ProtectedRoute';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import OrderConfirm from './components/Cart/OrderConfirm';
import Payment from './components/Cart/Payment';
import OrderStatus from './components/Cart/OrderStatus';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import MainData from './components/Admin/MainData';
import OrderTable from './components/Admin/Orders/OrderTable';
import UpdateOrder from './components/Admin/Orders/UpdateOrder';
import ProductTable from './components/Admin/Products/ProductTable';
import NewProduct from './components/Admin/Products/NewProduct';
import UpdateProduct from './components/Admin/Products/UpdateProduct';
import UserTable from './components/Admin/Users/UserTable';
import UpdateUser from './components/Admin/Users/UpdateUser';
import ReviewsTable from './components/Admin/Reviews/ReviewsTable';
import Wishlist from './components/Wishlist/Wishlist';
import NotFound from './components/NotFound';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
import ContactUs from './components/ContactUs/ContactUs';
import AboutUs from './components/AboutUs/AboutUs';
import UpdateAddress from './components/User/UpdateAddress';
import Rating from './components/Rating/Rating';
import NewCategory from './components/Admin/Categories/NewCategory';
import CategoriesTable from './components/Admin/Categories/CategoriesTable';
import UpdateCategory from './components/Admin/Categories/UpdateCategory';
import AdminLogin from './components/Admin/AdminLogin';
import UserDetails from './components/Cart/UserDetails';
import CouponsTable from './components/Admin/Coupons/CouponsTable';
import NewCoupon from './components/Admin/Coupons/NewCoupon';
import UpdateCoupon from './components/Admin/Coupons/UpdateCoupon';
import PrivacyPolicy from './components/Policy/PrivacyPolicy';
import TermsOfUse from './components/Policy/TermsOfUse';
import CancellationReturn from './components/Policy/CancellationReturn';
import ShippingPolicy from './components/Policy/ShippingPolicy';
import FaqsTable from './components/Admin/Faqs/FaqsTable';
import NewFaq from './components/Admin/Faqs/NewFaq';
import UpdateFaq from './components/Admin/Faqs/UpdateFaq';
import BlogTable from './components/Admin/Blogs/BlogTable';
import NewBlog from './components/Admin/Blogs/NewBlog';
import UpdateBlog from './components/Admin/Blogs/UpdateBlog';
import Blogs from './components/Blog/Blogs';
import BlogDetails from './components/Blog/BlogDetails';
import AdminProfile from './components/Admin/AdminProfile';

function App() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { paymentKey , loading } = useSelector((state) => state.paymentKey);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Barlow:300,400,500,600,700"]
      },
    });
    WebFont.load({
      google: {
        families: ["Public Sans:300,400,500,600,700"]
      },
    });
    WebFont.load({
      google: {
        families: ["Lora:300,400,500,600,700"]
      },
    });
  });

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadPaymentKey());
  }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])

  // disable right click
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  // window.addEventListener("keydown", (e) => {
  //   if (e.keyCode == 123) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  // });
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/product/:id/" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsOfUse />} />
        <Route path='/cancellation-return' element={<CancellationReturn />} />
        <Route path='/shipping-policy' element={<ShippingPolicy />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path="/blogs/:keyword" element={<Blogs />} />
        <Route path='/blog/:id/' element={<BlogDetails />} />

        {/* order process */}
        <Route path="/userdetails" element={
            <UserDetails />
        } ></Route>

        <Route path="/shipping" element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        } ></Route>

        <Route path="/order/confirm" element={
          <ProtectedRoute>
            <OrderConfirm />
          </ProtectedRoute>
        } ></Route>

        <Route path="/process/payment" element={
          <ProtectedRoute>
            {loading ? null :  paymentKey && (
              <Elements stripe={loadStripe(paymentKey)}>
                <Payment />
              </Elements>
            )}
          </ProtectedRoute>
        } ></Route>

        <Route path="/orders/success" element={<OrderSuccess success={true} />} />
        <Route path="/orders/failed" element={<OrderSuccess success={false} />} />
        {/* order process */}

        <Route path="/order/:id" element={
          <ProtectedRoute>
            <OrderStatus />
          </ProtectedRoute>
        } ></Route>

        <Route path="/orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }></Route>

        <Route path="/order_details/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }></Route>

        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } ></Route>

        <Route path="/password/update" element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        } ></Route>

        <Route path="/address" element={
          <ProtectedRoute>
            <UpdateAddress />
          </ProtectedRoute>
        } ></Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/wishlist" element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        } ></Route>

        <Route path="/rating" element={
          <ProtectedRoute>
            <Rating />
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin" element={
          <AdminLogin />
        } ></Route>

        <Route path="/admin/dashboard" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={0}>
              <MainData />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/orders" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <OrderTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/order/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <UpdateOrder />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/products" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <ProductTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/new_product" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <NewProduct />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/product/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <UpdateProduct />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/users" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={4}>
              <UserTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/user/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={4}>
              <UpdateUser />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/reviews" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <ReviewsTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/categories" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <CategoriesTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/new_category" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <NewCategory />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/category/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <UpdateCategory />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/coupons" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={6}>
              <CouponsTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/new_coupon" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={6}>
              <NewCoupon />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/coupon/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={6}>
              <UpdateCoupon />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/faqs" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={7}>
              <FaqsTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/new_faq" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={7}>
              <NewFaq />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/faq/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={7}>
              <UpdateFaq />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/blogs" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={8}>
              <BlogTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/new_blog" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={8}>
              <NewBlog />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/blog/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={8}>
              <UpdateBlog />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/profile/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={9}>
              <AdminProfile />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="*" element={<NotFound />}></Route>

      </Routes>
      <Footer />
    </>
  );
}

export default App;
