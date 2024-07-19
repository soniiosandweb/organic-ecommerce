import { useEffect, useState } from 'react';
import { myOrders, clearErrors } from '../../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import { useSnackbar } from 'notistack';
import OrderItem from './OrderItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SearchIcon from '@mui/icons-material/Search';
import MetaData from '../Layouts/MetaData';
import noResult from '../../assets/images/no-result.webp';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import { formatDate } from '../../utils/functions';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const orderStatus = ["Processing", "Shipped", "Delivered"];
const dt = new Date();
const ordertime = [dt.getMonth(), dt.getFullYear() - 1, dt.getFullYear() - 2];

const MyOrders = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [status, setStatus] = useState("");
    const [orderTime, setOrderTime] = useState(0);
    const [search, setSearch] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);

    const { orders, loading, error } = useSelector((state) => state.myOrders);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, enqueueSnackbar]);

    useEffect(() => {
        if (loading === false) {
            setFilteredOrders(orders);
        }
    }, [loading, orders]);


    useEffect(() => {
        setSearch("");
        // console.log(status);
        // console.log(typeof orderTime);
        // console.log(orderTime);

        if (!status && +orderTime === 0) {
            setFilteredOrders(orders);
            return;
        }

        if (status && orderTime) {
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) => order.orderStatus === status &&
                    new Date(order.createdAt).getMonth() === +orderTime
                );
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) => order.orderStatus === status &&
                    new Date(order.createdAt).getFullYear() === +orderTime
                );
                setFilteredOrders(filteredArr);
            }
        } else if (!status) {
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) =>
                    new Date(order.createdAt).getMonth() === +orderTime
                );
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) =>
                    new Date(order.createdAt).getFullYear() === +orderTime
                );
                setFilteredOrders(filteredArr);
            }
        } else {
            const filteredArr = orders.filter((order) => order.orderStatus === status);
            setFilteredOrders(filteredArr);
        }
        // eslint-disable-next-line
    }, [status, orderTime]);

    const searchOrders = (e) => {
        e.preventDefault();
        // if (!search.trim()) {
        //     enqueueSnackbar("Empty Input", { variant: "warning" });
        //     return;
        // }
        const arr = orders.map((el) => ({
            ...el,
            orderItems: el.orderItems.filter((order) =>
                order.name.toLowerCase().includes(search.toLowerCase()))
        }));
        setFilteredOrders(arr);
        console.log(arr)
    }

    const clearFilters = () => {
        setStatus("");
        setOrderTime(0);
    }

    return (
        <>
            <MetaData title="My Orders | Fresh Organic Grocery" />

            <main className="w-full py-16 px-4">

                {/* <!-- row --> */}
                <div className="flex gap-3.5 flex-col lg:flex-row sm:w-11/12 m-auto">

                    {/* <!-- sidebar column  --> */}
                    <div className="flex flex-col w-full lg:w-1/4 px-1">

                        {/* <!-- nav tiles --> */}
                        <div className="flex flex-col bg-white border border-gray-300">

                            {/* <!-- filters header --> */}
                            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-between gap-5 px-4 py-2 border-b border-gray-300">
                                <p className="text-md font-bold uppercase">Filters</p>
                                <span onClick={clearFilters} className="capitalize bg-primary-green text-white text-md cursor-pointer font-semibold px-5 py-2.5 rounded-sm shadow-lg hover:bg-black">clear all</span>
                            </div>

                            {/* <!-- order status checkboxes --> */}
                            <div className="flex flex-col py-3 text-sm">
                                <span className="text-md font-medium px-4">Order Status</span>

                                {/* <!-- checkboxes --> */}
                                <div className="flex flex-col text-sm gap-3 px-4 mt-1 pb-3 border-b border-gray-300">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="orderstatus-radio-buttons-group"
                                            onChange={(e) => setStatus(e.target.value)}
                                            name="orderstatus-radio-buttons"
                                            value={status}
                                        >
                                            {orderStatus.map((el, i) => (
                                                <FormControlLabel value={el} control={<Radio size="small" />} key={i} label={<span className="text-sm">{el}</span>} />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                {/* <!-- checkboxes --> */}

                            </div>
                            {/* <!-- order status checkboxes --> */}

                            {/* <!-- order time checkboxes --> */}
                            <div className="flex flex-col pb-2 text-sm">
                                <span className="text-md font-medium px-4">Order Time</span>

                                {/* <!-- checkboxes --> */}
                                <div className="flex flex-col gap-3 mt-1 px-4 pb-3">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="ordertime-radio-buttons-group"
                                            onChange={(e) => setOrderTime(e.target.value)}
                                            name="ordertime-radio-buttons"
                                            value={orderTime}
                                        >
                                            {ordertime.map((el, i) => (
                                                <FormControlLabel value={el} control={<Radio size="small" />} key={i} label={<span className="text-sm">{i === 0 ? "This Month" : el}</span>} />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                {/* <!-- checkboxes --> */}

                            </div>
                            {/* <!-- order time checkboxes --> */}

                        </div>
                        {/* <!-- nav tiles --> */}

                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- orders column --> */}
                    <div className="flex-1">

                        {loading ? <Loader /> : (
                            <div className="flex flex-col gap-3 overflow-hidden pb-3">

                                {/* <!-- searchbar --> */}
                                <form onSubmit={searchOrders} className="flex items-center justify-between w-full bg-white border-0 border-gray-300 flex-col sm:flex-row order-search">
                                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" name="search" placeholder="Search your orders here" className="w-full text-md flex-1 outline-none border border-solid border-gray-300 placeholder-gray-500 px-4 sm:px-6 h-12 focus:border-primary-green" />
                                    <button type="submit" className="h-12 px-4 border border-solid border-primary-green text-white bg-primary-green hover:bg-black hover:border-black flex items-center gap-1">
                                        <SearchIcon sx={{ fontSize: "22px" }} />
                                        Search Orders
                                    </button>
                                </form>
                                {/* <!-- searchbar --> */}

                                {orders && filteredOrders.length === 0 ? (
                                    <div className="flex items-center flex-col gap-2 p-8 bg-white text-md">
                                        <LazyLoadImage 
                                            src={noResult} alt="Empty Orders"
                                        />
                                        <span className="text-lg font-medium">Sorry, no results found</span>
                                        <p>Edit search or clear all filters</p>
                                    </div>
                                ): filteredOrders.map((order, index) => {

                                    const { _id, orderStatus, orderItems, createdAt, deliveredAt, totalPrice, paymentInfo } = order;

                                    return (
                                        <Link to={`/order_details/${_id}`} className="w-full flex flex-col sm:flex-row p-4 items-start bg-white border border-gray-300 rounded gap-2 sm:gap-0 hover:shadow-lg" key={index}>
                                            <div className='flex flex-col flex-1'>
                                            {orderItems.map((item, index) => (
                                                
                                                    <OrderItem {...item} key={index} orderId={_id} orderStatus={orderStatus} createdAt={createdAt} deliveredAt={deliveredAt} />
                                                
                                            ))}
                                            </div>

                                            <div className="flex flex-col sm:flex-row mt-1 sm:mt-0 gap-2 sm:gap-20 sm:w-1/2">
                                                

                                                <div className="flex flex-col gap-1.5">
                                                    <p className="text-sm font-medium flex items-center gap-1">
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
                                                        <p className="text-sm ml-1">Your item has been {orderStatus}</p>
                                                        : orderStatus === "Shipped" ?
                                                            <p className="text-sm ml-1">Your item has been {orderStatus}</p> :
                                                            <p className="text-sm ml-1">Seller has processed your order</p>
                                                    }

                                                    <p className="text-sm"><span className='font-medium'>Total:</span> ₹{totalPrice.toLocaleString()}</p>
                                                    <p className="text-sm"><span className='font-medium'>Payment Method:</span> {paymentInfo.method === "stripe" ? "Stripe" : "Cash on delivery"}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }).reverse()}
                            </div>
                        )}

                    </div>
                    {/* <!-- orders column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default MyOrders;
