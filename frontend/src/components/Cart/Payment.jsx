import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { addPaymentData, clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
// import { post } from '../../utils/paytmForm';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import stripeImg from '../../assets/images/stripe.webp';
import googlePayImg from '../../assets/images/google-pay-logo.webp';
import razorPay from '../../assets/images/razorpay.png';
import phonePayLogo from '../../assets/images/PhonePe-Logo.webp';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from "react-router-dom";
import { newOrderData } from '../../actions/orderAction';
import { emptyCart } from '../../actions/cartAction';
import Loader from '../Layouts/Loader';
import { emptyCouponCode } from '../../actions/couponAction';
import { getAddressDetails } from '../../actions/shippingAction';
import GooglePayButton from '@google-pay/button-react';

const Payment = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const stripe = useStripe();
    const elements = useElements();
    const paymentBtn = useRef(null);

    // const [payDisable, setPayDisable] = useState(false);

    const [method, setMethod] = useState('cash');

    const { loading } = useSelector((state) => state.paymentKey);

    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { success, error } = useSelector((state) => state.newOrder);
    const { totalAmount } = useSelector((state) => state.cart);

    const { addressInfo, loading: addressLoading } = useSelector((state) => state.address);

    const [shippingInfo, setShippingInfo] = useState('');

    const totalPrice = totalAmount;

    const paymentData = {
        amount: Math.round(totalAmount),
        email: user.email,
        phoneNo: shippingInfo.phoneNo,
        description: "Organic Products",
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        totalPrice,
    }

    const cardElementOptions = {
        style: {
          base: {
            color: "#666",
            fontSize: "18px",
          },
          invalid: {
            color: "#fa755a",
            fontSize: "18px",
          }
        }
      }

    const submitHandler = async (e) => {
        e.preventDefault();

        paymentBtn.current.disabled = true;
        // setPayDisable(true);

        if(method === 'stripe'){
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const {data} = await axios.post(
                    '/api/v1/payment/process',
                    paymentData,
                    config,
                );

                    // let info = {
                    //     action: "https://securegw-stage.paytm.in/order/process",
                    //     params: data.paytmParams
                    // }

                    // post(info)

                    if (!stripe || !elements) return;

                    const result = await stripe.confirmCardPayment(data.client_secret, {
                        payment_method: {
                            card: elements.getElement(CardNumberElement),
                            billing_details: {
                                name: user.name,
                                email: user.email,
                                address: {
                                    line1: shippingInfo.address,
                                    city: shippingInfo.city,
                                    country: shippingInfo.country,
                                    state: shippingInfo.state,
                                    postal_code: shippingInfo.pincode,
                                },
                            },
                        },
                    });

                    if (result.error) {
                        paymentBtn.current.disabled = false;
                        enqueueSnackbar(result.error.message, { variant: "error" });
                    } else {
                        if (result.paymentIntent.status === "succeeded") {

                            const payment = {
                                id: result.paymentIntent.id,
                                client_secret: result.paymentIntent.client_secret,
                                status: result.paymentIntent.status,
                                amount: result.paymentIntent.amount,
                                livemode: result.paymentIntent.livemode,
                            }

                            dispatch(addPaymentData(payment));

                            order.paymentInfo = {
                                id: result.paymentIntent.id,
                                status: result.paymentIntent.status,
                                method: method,
                            };

                            dispatch(newOrderData(order));
                            // dispatch(emptyCart());
                            // dispatch(emptyCouponCode());

                            // navigate("/orders/success");
                        } else {
                            enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
                        }
                    }

            } catch (error) {
                paymentBtn.current.disabled = false;
                // setPayDisable(false);
                enqueueSnackbar(error.message, { variant: "error" });

            }

        } else if(method === 'razorpay') {

            try {
                const { data } = await axios.post(
                    `/api/v1/payment/razor-create-order`,
                    { amount: totalAmount }
                );

                const options = {
                    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                    amount: data.order.amount,
                    currency: "INR",
                    name: "Fresh Organic Grocery",
                    description: "Product Transaction",
                    order_id: data.order.id,
                    handler: async function (response) {

                        const paymentId = response.razorpay_payment_id;

                        const payment = {
                            id: paymentId,
                            client_secret: paymentId,
                            status: 'succeeded',
                            amount: totalAmount,
                            livemode: 'false',
                        }

                        dispatch(addPaymentData(payment));

                        order.paymentInfo = {
                            id: paymentId,
                            status: 'succeeded',
                            method: method,
                        };

                        dispatch(newOrderData(order));
                        
                    },
                    prefill: { email: user.email, contact: shippingInfo.phoneNo },
                    theme: { color: "#0da487" },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();

            } catch (err) {
                enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
            }

        } else if(method === 'phonepe') {

            try {
                const res = await axios.post(`/api/v1/payment/phonepay-initiate`, {
                    amount: totalAmount,
                    mobileNumber: shippingInfo.phoneNo,
                    name: user.name,
                    merchantUserId: 'USER'+Date.now()
                });
                if (res.data && res.data.redirectUrl) {
                    // redirect to PhonePe payment page
                    window.location.href = res.data.redirectUrl;
                } else {
                    console.error('Invalid payment initiation response', res.data);
                    // alert('Invalid payment initiation response', res.data.message);
                    enqueueSnackbar("Invalid payment initiation response", { variant: "error" });
                }
            } catch (err) {
                console.error('Payment initiation failed', err);
                // alert('Payment initiation failed', err);
                enqueueSnackbar("Payment initiation failed", { variant: "error" });
            }

        } else {
            order.paymentInfo = {
                status: "succeeded",
                method: method,
            };

            console.log(order)

            dispatch(newOrderData(order));
            
        }
        
    };

    const handlePaymentData = async (paymentData) => {
        try {

            // Extract the token string from GPay response
            const token = paymentData.paymentMethodData.tokenizationData.token;

            // Send to backend for processing
            const response = await fetch(`/api/v1/payment/process-googlepay`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    amount: totalAmount,
                }),
            });

            const result = await response.json();
            console.log("Server response:", result);
            if(result.success) {

                const parsedToken = JSON.parse(token);

                const payment = {
                    id: result.transactionId,
                    client_secret: parsedToken.id,
                    status: result.paymentStatus,
                    amount: totalAmount,
                    livemode: result.livemode,
                }

                dispatch(addPaymentData(payment));

                order.paymentInfo = {
                    id: result.transactionId,
                    status: result.paymentStatus,
                    method: method,
                };

                dispatch(newOrderData(order));

            } else { 
                enqueueSnackbar("Processing Payment Failed!", { variant: "error" })
            }

        } catch (error) {
            console.error("Error processing payment:", error);
            enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
        }
    }

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
        }

        if(success){
            dispatch(emptyCart());
            dispatch(emptyCouponCode());
            dispatch(clearErrors());
            navigate("/orders/success");
        }

        if(addressLoading === undefined){
            dispatch(getAddressDetails(user._id));
        } 
        if(addressInfo.length > 0 ){
            setShippingInfo(addressInfo[0]);
        }

    }, [dispatch, error, enqueueSnackbar, loading, user, addressLoading, addressInfo, navigate, success]);

    return (
        <>
            <MetaData title="Fresh Organic Grocery: Secure Payment | Paytm" />

            {loading ? <Loader /> : 

                <main className="w-full py-16 px-4">

                    {/* <!-- row --> */}
                    <div className="flex flex-col lg:flex-row gap-3.5 w-full sm:w-11/12 mt-0 lg:mt-4 m-auto lg:mb-7">

                        {/* <!-- cart column --> */}
                        <div className="flex-1">

                            <Stepper activeStep={3}>
                                <div className="w-full bg-white">

                                {/* <form onSubmit={(e) => submitHandler(e)} autoComplete="off" className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden">
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="payment-radio-group"
                                                defaultValue="paytm"
                                                name="payment-radio-button"
                                            >
                                                <FormControlLabel
                                                    value="paytm"
                                                    control={<Radio />}
                                                    label={
                                                        <div className="flex items-center gap-4">
                                                            <LazyLoadImage 
                                                                className="h-6 w-6 object-contain" src={paytm} alt="Paytm Logo" 
                                                            />
                                                            <span>Paytm</span>
                                                        </div>
                                                    }
                                                />
                                            </RadioGroup>
                                        </FormControl>

                                        <input type="submit" value={`Pay ₹${totalAmount.toLocaleString()}`} disabled={payDisable ? true : false} className={`${payDisable ? "bg-primary-grey cursor-not-allowed" : "bg-primary-green cursor-pointer"} w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`} />

                                    </form> */}

                                    {/* stripe form */}
                                    <form onSubmit={(e) => submitHandler(e)} autoComplete="off" className="flex flex-col justify-start gap-3 w-full px-3 sm:px-8 py-4">

                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="payment-radio-group"
                                                defaultValue="cash"
                                                name="payment-radio-button"
                                                onChange={(e) => setMethod(e.target.value)}
                                            >
                                                <FormControlLabel
                                                    value="cash"
                                                    control={<Radio />}
                                                    label={
                                                        <div className="flex items-center gap-4">
                                                            <span>Cash on delivery</span>
                                                        </div>
                                                    }
                                                />

                                                <FormControlLabel
                                                    value="stripe"
                                                    control={<Radio />}
                                                    label={
                                                        <div className="flex items-center gap-4">
                                                            <span>Stripe</span>
                                                            <LazyLoadImage 
                                                                className="h-10 object-contain" src={stripeImg} alt="Stripe Logo" 
                                                            />
                                                        </div>
                                                    }
                                                />

                                                <FormControlLabel
                                                    value="googlepay"
                                                    control={<Radio />}
                                                    label={
                                                        <div className="flex items-center gap-4">
                                                            <span>Google Pay</span>
                                                            <LazyLoadImage 
                                                                className="h-8 object-contain" src={googlePayImg} alt="Google Pay Logo" 
                                                            />
                                                        </div>
                                                    }
                                                />

                                                <FormControlLabel
                                                    value="razorpay"
                                                    control={<Radio />}
                                                    label={
                                                        <div className="flex items-center gap-4">
                                                            <span>Razorpay</span>
                                                            <LazyLoadImage 
                                                                className="h-8 object-contain" src={razorPay} alt="Razor Pay Logo" 
                                                            />
                                                        </div>
                                                    }
                                                />

                                                <FormControlLabel
                                                    value="phonepe"
                                                    control={<Radio />}
                                                    label={
                                                        <div className="flex items-center gap-4">
                                                            <span>PhonePe</span>
                                                            <LazyLoadImage 
                                                                className="h-8 object-contain" src={phonePayLogo} alt="PhonePe Logo" 
                                                            />
                                                        </div>
                                                    }
                                                />

                                            </RadioGroup>
                                        </FormControl>

                                        {method === 'stripe' &&

                                            <div className="flex flex-col lg:flex-row w-full gap-4">
                                                <div className='w-4/6  border border-gray-300 px-5 py-3 rounded-md'>
                                                    <CardNumberElement options={cardElementOptions} />
                                                </div>
                                                <div className='w-2/6 border border-gray-300 px-5 py-3 rounded-md'>
                                                    <CardExpiryElement options={cardElementOptions} />
                                                </div>
                                                <div className='w-2/6 border border-gray-300 px-5 py-3 rounded-md'>
                                                    <CardCvcElement options={cardElementOptions} />
                                                </div>
                                            </div>
                                        }

                                        <div className='flex-1 w-full'>
                                            {method === 'googlepay' ? 
                                                <GooglePayButton
                                                    environment="TEST"
                                                    buttonColor="black"
                                                    buttonType="buy"
                                                    paymentRequest={{
                                                        apiVersion: 2,
                                                        apiVersionMinor: 0,
                                                        allowedPaymentMethods: [
                                                        {
                                                            type: "CARD",
                                                            parameters: {
                                                            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                                                            allowedCardNetworks: ["MASTERCARD", "VISA"],
                                                            },
                                                            tokenizationSpecification: {
                                                                type: "PAYMENT_GATEWAY",
                                                                parameters: {
                                                                    gateway: "stripe",
                                                                    "stripe:version": "2020-08-27",
                                                                    "stripe:publishableKey": "pk_test_51PNSx7A2nuiqtZl37LIvC5AJQsJzg84hvRtbXSwIUk9u7KF827dUDUx3htyk2h0HKCmxYkpQQFx6gryUpEHJxetx00icrat2gT",
                                                                },
                                                            },
                                                        },
                                                        ],
                                                        merchantInfo: {
                                                            merchantName: "Fresh Organic Grocery",
                                                        },
                                                        transactionInfo: {
                                                            totalPriceStatus: "FINAL",
                                                            totalPriceLabel: "Total",
                                                            totalPrice: totalAmount.toString(),
                                                            currencyCode: "INR",
                                                            countryCode: "IN",
                                                        },
                                                    }}
                                                    onLoadPaymentData={handlePaymentData}
                                                />
                                            :
                                                <input ref={paymentBtn} type="submit" value="Place Order" className="bg-primary-green w-full sm:w-1/4 my-2 py-3.5 text-sm font-medium text-white shadow hover:bg-black rounded-sm capitalize outline-none cursor-pointer" />
                                            }
                                        </div>
                                    
                                    </form>
                                    {/* stripe form */}

                                </div>
                            </Stepper>
                        </div>

                        <PriceSidebar cartItems={cartItems} />
                    </div>
                </main>

            }
        </>
    );
};

export default Payment;