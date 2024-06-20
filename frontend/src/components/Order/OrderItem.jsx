import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/functions';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const OrderItem = (props) => {

    const { orderId, name, image, price, quantity, createdAt, deliveredAt, orderStatus } = props;

    return (
        <Link to={`/order_details/${orderId}`} className="flex flex-col sm:flex-row p-4 items-start bg-white border border-gray-300 rounded gap-2 sm:gap-0 hover:shadow-lg">
            {/* <!-- image container --> */}
            <div className="w-full sm:w-32 h-20">
                <LazyLoadImage 
                    className="h-full w-full object-contain" src={image} alt={name}
                />
            </div>
            {/* <!-- image container --> */}

            {/* <!-- order desc container --> */}
            <div className="flex flex-col sm:flex-row justify-between w-full">

                <div className="flex flex-col gap-1 overflow-hidden">
                    <p className="text-lg font-semibold">{name.length > 40 ? `${name.substring(0, 40)}...` : name}</p>
                    <p className="text-md mt-2">Quantity: {quantity}</p>
                    <p className="text-md ">Total: ₹{(quantity * price).toLocaleString()}</p>
                </div>

                <div className="flex flex-col sm:flex-row mt-1 sm:mt-0 gap-2 sm:gap-20 sm:w-1/2">
                    <p className="text-md font-medium">₹{price.toLocaleString()}</p>

                    <div className="flex flex-col gap-1.5">
                        <p className="text-md font-medium flex items-center gap-1">
                            {orderStatus === "Shipped" ? (
                                <>
                                    <span className="text-primary-green pb-0.5">
                                        <CircleIcon sx={{ fontSize: "16px" }} />
                                    </span>
                                    Shipped
                                </>
                            ) : orderStatus === "Delivered" ? (
                                <>
                                    <span className="text-primary-green pb-0.5">
                                        <CircleIcon sx={{ fontSize: "16px" }} />
                                    </span>
                                    Delivered on {formatDate(deliveredAt)}
                                </>
                            ) : (
                                <>
                                    <span className="text-primary-green pb-0.5">
                                        <RadioButtonUncheckedIcon sx={{ fontSize: "16px" }} />
                                    </span>
                                    Ordered on {formatDate(createdAt)}
                                </>
                            )}
                        </p>
                        {orderStatus === "Delivered" ?
                            <p className="text-md ml-1">Your item has been {orderStatus}</p>
                            : orderStatus === "Shipped" ?
                                <p className="text-md ml-1">Your item has been {orderStatus}</p> :
                                <p className="text-md ml-1">Seller has processed your order</p>
                        }
                    </div>
                </div>

            </div>
            {/* <!-- order desc container --> */}

        </Link>
    );
};

export default OrderItem;
