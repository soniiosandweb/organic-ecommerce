import axios from 'axios';
import { useEffect, useRef } from 'react';
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
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import paytm from '../../assets/images/paytm.webp';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from "react-router-dom";
import { newOrderData } from '../../actions/orderAction';
import { emptyCart } from '../../actions/cartAction';
import Loader from '../Layouts/Loader';

const Payment = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const stripe = useStripe();
    const elements = useElements();
    const paymentBtn = useRef(null);

    // const [payDisable, setPayDisable] = useState(false);

    const { loading } = useSelector((state) => state.paymentKey);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const paymentData = {
        amount: Math.round(totalPrice),
        email: user.email,
        phoneNo: shippingInfo.phoneNo,
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

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
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
                    };

                    dispatch(newOrderData(order));
                    dispatch(emptyCart());

                    navigate("/orders/success");
                } else {
                    enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
                }
            }

        } catch (error) {
            paymentBtn.current.disabled = false;
            // setPayDisable(false);
            enqueueSnackbar(error, { variant: "error" });
        }
    };

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
        }
    }, [dispatch, error, enqueueSnackbar]);


    return (
        <>
            <MetaData title="Organic: Secure Payment | Paytm" />

            {loading ? <Loader /> : 

                <main className="w-full py-16 px-4">

                    {/* <!-- row --> */}
                    <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">

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
                                                            <img draggable="false" className="h-6 w-6 object-contain" src={paytm} alt="Paytm Logo" />
                                                            <span>Paytm</span>
                                                        </div>
                                                    }
                                                />
                                            </RadioGroup>
                                        </FormControl>

                                        <input type="submit" value={`Pay ₹${totalPrice.toLocaleString()}`} disabled={payDisable ? true : false} className={`${payDisable ? "bg-primary-grey cursor-not-allowed" : "bg-primary-green cursor-pointer"} w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`} />

                                    </form> */}

                                    {/* stripe form */}
                                    <form onSubmit={(e) => submitHandler(e)} autoComplete="off" className="flex flex-col justify-start gap-3 w-full px-1 sm:px-8 py-4">

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
                                    
                                        <div className='flex-1 w-full'>
                                            <input ref={paymentBtn} type="submit" value="Place Order" className="bg-primary-green w-full sm:w-1/4 my-2 py-3.5 text-sm font-medium text-white shadow hover:bg-black rounded-full capitalize outline-none cursor-pointer" />
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