import axios from "axios";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAddressDetails } from "../../actions/shippingAction";
import { addPaymentData, clearErrors } from "../../actions/orderAction";
import { newOrderData } from '../../actions/orderAction';
import { emptyCart } from '../../actions/cartAction';
import { emptyCouponCode } from '../../actions/couponAction';
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../Layouts/Loader";

const OrderResponse = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { totalAmount } = useSelector((state) => state.cart);
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { success, error } = useSelector((state) => state.newOrder);
    const { addressInfo, loading: addressLoading } = useSelector((state) => state.address);
    
    const [shippingInfo, setShippingInfo] = useState('');
    
    const totalPrice = totalAmount;

    const order = {
        shippingInfo,
        orderItems: cartItems,
        totalPrice,
    }

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
            navigate("/orders/failed");
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
    
    }, [dispatch, error, enqueueSnackbar, user, addressLoading, addressInfo, navigate, success]);
    

    useEffect(() => {
    
        const getResponse = async () => {
            try {
                const res = await axios.get(`/api/v1/payment/phonepay-status/${id}`);
                if (res.data) {
                    console.log(res)

                    const payment = {
                        id: res.data.data.transactionId,
                        client_secret: res.data.data.transactionId,
                        status: res.data.data.responseCode,
                        amount: totalAmount,
                        livemode: 'false',
                    }

                    console.log(payment)
    
                    dispatch(addPaymentData(payment));
    
                    order.paymentInfo = {
                        id: res.data.data.transactionId,
                        status: 'succeeded',
                        method: 'phonepe',
                    };

                    console.log(order)
    
                    dispatch(newOrderData(order));
    
                } else {
                    console.error('Invalid payment initiation response', res.data);
                    enqueueSnackbar("Processing Payment Failed!", { variant: "error" })
                }
            } catch (err) {
                console.error('Payment initiation failed', err);
                enqueueSnackbar("Processing Payment Failed!", { variant: "error" })
            }
        }
        
        if(shippingInfo && id ){
            getResponse();
        }
            
    },[dispatch, enqueueSnackbar, shippingInfo, id, totalAmount ])
    
    return (
        <Loader />
    );
}



export default OrderResponse