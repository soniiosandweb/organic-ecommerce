import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import { formatDate } from '../../utils/functions';
import TrackStepper from '../Order/TrackStepper';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MetaData from '../Layouts/MetaData';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const UpdateOrder = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("");

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { isUpdated, error: updateError } = useSelector((state) => state.order);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Order Updates Successfully", { variant: "success" });
            dispatch({ type: UPDATE_ORDER_RESET });
            navigate("/admin/orders");
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, isUpdated, updateError, enqueueSnackbar, navigate]);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("status", status);
        dispatch(updateOrder(params.id, formData));
    }

    return (
        <>
            <MetaData title="Admin: Update Order | Fresh Organic Grocery" />

            {loading ? <Loading /> : (
                <>
                    {order && order.user && order.shippingInfo && (
                        <div className="flex flex-col gap-4">
                            <Link to="/admin/orders" className="ml-1 flex items-center gap-0 font-medium text-primary-green uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>

                            <div className="flex flex-col bg-white w-full py-4 sm:py-8 gap-10">

                                <div className="flex flex-col w-full">
                                    <h3 className="font-semibold text-xl text-center">Order Status</h3>
                                    <TrackStepper
                                        orderOn={order.createdAt}
                                        shippedAt={order.shippedAt}
                                        deliveredAt={order.deliveredAt}
                                        activeStep={
                                            order.orderStatus === "Delivered" ? 2 : order.orderStatus === "Shipped" ? 1 : 0
                                        }
                                    />
                                </div>

                                <form onSubmit={updateOrderSubmitHandler} className="flex flex-col gap-3 flex-1 w-full xl:w-2/3">
                                    <h3 className="font-semibold text-lg">Update Status</h3>
                                    <div className="flex gap-2">
                                        <p className="text-md font-medium">Current Status:</p>
                                        <p className="text-md">
                                            {order.orderStatus === "Shipped" && (`Shipped on ${formatDate(order.shippedAt)}`)}
                                            {order.orderStatus === "Processing" && (`Ordered on ${formatDate(order.createdAt)}`)}
                                            {order.orderStatus === "Delivered" && (`Delivered on ${formatDate(order.deliveredAt)}`)}
                                        </p>
                                    </div>
                                    <FormControl fullWidth sx={{ marginTop: 1 }}>
                                        <InputLabel id="order-status-select-label">Status</InputLabel>
                                        <Select
                                            labelId="order-status-select-label"
                                            id="order-status-select"
                                            value={status}
                                            label="Status"
                                            required
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            {order.orderStatus === "Shipped" && (<MenuItem value={"Delivered"}>Delivered</MenuItem>)}
                                            {order.orderStatus === "Processing" && (<MenuItem value={"Shipped"}>Shipped</MenuItem>)}
                                            {order.orderStatus === "Delivered" && (<MenuItem value={"Delivered"}>Delivered</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <button type="submit" className="bg-primary-green p-2.5 text-white font-medium rounded shadow hover:shadow-lg">
                                        Update
                                    </button>
                                </form>
                            </div>

                            <div className="flex flex-wrap flex-col lg:flex-row min-w-full gap-5">

                                <div className='flex flex-col gap-3 flex-1 border border-gray-300 bg-white p-4 md:p-8'>

                                    <p className="w-full text-lg"><span className='font-semibold'>Total:</span> ₹{order.totalPrice.toLocaleString()}</p>
                                    <p className="w-full text-lg"><span className='font-semibold'>Payment Method:</span> {order.paymentInfo.method === "stripe" ? "Stripe" : "Cash on delivery"}</p>
                                    <p className="w-full text-lg font-semibold">Order Items: </p>

                                    {order.orderItems && order.orderItems.map((item,index) => {

                                        const { image, name, price, quantity } = item;

                                        return (
                                            <div className="flex flex-row w-full gap-2 py-3" key={index}>
                                                    <div className="w-18 sm:w-32 h-20">
                                                        <LazyLoadImage 
                                                            className="h-full w-full object-contain" src={image} alt={name}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1 overflow-hidden">
                                                        <p className="text-lg font-semibold">{name.length > 60 ? `${name.substring(0, 60)}...` : name}</p>
                                                        <p className="text-md mt-2">Quantity: {quantity}</p>
                                                        <p className="text-md">Price: ₹{price.toLocaleString()}</p>
                                                        
                                                    </div>
                                            </div>
                                        )
                                        })
                                    }
                                </div>

                                <div className="w-full flex flex-col gap-3 flex-1 border border-gray-300 bg-white p-4 md:p-8">

                                        <h3 className="font-semibold text-xl">Delivery Address</h3>
                                        <h4 className="font-medium text-lg">{order.user.name}</h4>
                                        <p className="text-md">{`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pincode}`}</p>
                                        <div className="flex gap-2 text-md">
                                            <p className="font-medium">Email</p>
                                            <p>{order.user.email}</p>
                                        </div>
                                        <div className="flex gap-2 text-md">
                                            <p className="font-medium">Phone Number</p>
                                            <p>{order.shippingInfo.phoneNo}</p>
                                        </div>
                                    </div>
                                
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default UpdateOrder;
