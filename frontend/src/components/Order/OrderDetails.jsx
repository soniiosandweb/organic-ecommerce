import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import Loader from '../Layouts/Loader';
import TrackStepper from './TrackStepper';
import MetaData from '../Layouts/MetaData';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { order, error, loading } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
       
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Order Details | Fresh Organic Grocery" />

            <main className="w-full py-16 px-4">
                <div className="sm:w-11/12 m-auto w-full">
                {loading ? <Loader /> : (
                    <>
                        {order && order.user && order.shippingInfo && (
                            <div className="flex flex-col gap-10 max-w-6xl mx-auto">

                                <div className="flex flex-col w-full gap-3">
                                    <h3 className="font-medium text-xl text-center">Order Status</h3>
                                    <TrackStepper
                                        orderOn={order.createdAt}
                                        shippedAt={order.shippedAt}
                                        deliveredAt={order.deliveredAt}
                                        activeStep={
                                            order.orderStatus === "Delivered" ? 2 : order.orderStatus === "Shipped" ? 1 : 0
                                        }
                                    />
                                </div>

                                <div className="flex flex-wrap flex-col lg:flex-row min-w-full gap-5">

                                    <div className='flex flex-col gap-3 flex-1 border border-gray-300 bg-white p-4 md:p-8'>

                                        <p className="w-full text-md"><span className='font-medium'>Total:</span> ₹{order.totalPrice.toLocaleString()}</p>
                                        <p className="w-full text-md"><span className='font-medium'>Payment Method:</span> {order.paymentInfo.method === "stripe" ? "Stripe" : "Cash on delivery"}</p>
                                        <p className="w-full text-md font-medium">Order Items: </p>

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
                                                            <p className="text-md font-medium">{name.length > 60 ? `${name.substring(0, 60)}...` : name}</p>
                                                            <p className="text-sm mt-2">Quantity: {quantity}</p>
                                                            <p className="text-sm">Price: ₹{price.toLocaleString()}</p>
                                                            
                                                        </div>
                                                </div>
                                            )
                                            })
                                        }
                                        
                                        
                                    </div>

                                    <div className="w-full flex flex-col gap-3 flex-1 border border-gray-300 bg-white p-4 md:p-8">

                                        <h3 className="font-medium text-lg">Delivery Address</h3>
                                        <h4 className="font-medium text-md">{order.user.name}</h4>
                                        <p className="text-sm">{`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pincode}`}</p>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Email</p>
                                            <p>{order.user.email}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Phone Number</p>
                                            <p>{order.shippingInfo.phoneNo}</p>
                                        </div>
                                    </div>

                                </div>

                                <div className="flex flex-col w-full">
                                    <Link to={`/orders`} className='inline mx-auto text-primary-green text-lg font-semibold'>~ View all orders ~</Link>
                                </div>

                            </div>
                        )}
                    </>
                )}
                </div>
            </main>
        </>
    );
};

export default OrderDetails;
