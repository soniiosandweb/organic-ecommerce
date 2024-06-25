import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
            <MetaData title="Order Details | Organic" />

            <main className="w-full py-16 px-4">
                <div className="sm:w-11/12 m-auto w-full">
                {loading ? <Loader /> : (
                    <>
                        {order && order.user && order.shippingInfo && (
                            <div className="flex flex-col gap-6 max-w-6xl mx-auto">

                                <div className="flex bg-white border border-gray-300 min-w-full">
                                    <div className="w-full border-r">
                                        <div className="flex flex-col gap-3 my-8 mx-10">
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

                                <div className="flex flex-wrap flex-col sm:flex-row min-w-full border border-gray-300 bg-white px-2 py-5">

                                    <div className='flex flex-col w-full sm:w-1/2'>
                                        {order.orderItems && order.orderItems.map((item,index) => {

                                            const { image, name, price, quantity } = item;

                                            return (
                                                <div className="flex flex-col sm:flex-row w-full gap-2 py-3" key={index}>
                                                        <div className="w-full sm:w-32 h-20">
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

                                    <div className="flex flex-col w-full sm:w-1/2 mt-5 sm:mt-0">
                                        <h3 className="font-medium sm:text-center">Order Status</h3>
                                        <TrackStepper
                                            orderOn={order.createdAt}
                                            shippedAt={order.shippedAt}
                                            deliveredAt={order.deliveredAt}
                                            activeStep={
                                                order.orderStatus === "Delivered" ? 2 : order.orderStatus === "Shipped" ? 1 : 0
                                            }
                                        />
                                    </div>

                                    <p className="flex-1 pt-5 mt-5 text-xl font-semibold text-center border-t">Order Total: ₹{order.totalPrice.toLocaleString()}</p>
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
