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
    }

    const clearFilters = () => {
        setStatus("");
        setOrderTime(0);
    }

    return (
        <>
            <MetaData title="My Orders | Organic" />

            <main className="w-full py-16 px-4">

                {/* <!-- row --> */}
                <div className="flex gap-3.5 flex-col lg:flex-row sm:w-11/12 m-auto">

                    {/* <!-- sidebar column  --> */}
                    <div className="flex flex-col w-full lg:w-1/4 px-1">

                        {/* <!-- nav tiles --> */}
                        <div className="flex flex-col bg-white border border-gray-300">

                            {/* <!-- filters header --> */}
                            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-between gap-5 px-4 py-2 border-b border-gray-300">
                                <p className="text-lg font-bold uppercase">Filters</p>
                                <span onClick={clearFilters} className="capitalize bg-primary-green text-white text-md cursor-pointer font-semibold px-5 py-2.5 rounded-full shadow-lg hover:bg-black">clear all</span>
                            </div>

                            {/* <!-- order status checkboxes --> */}
                            <div className="flex flex-col py-3 text-sm">
                                <span className="text-lg font-semibold px-4">Order Status</span>

                                {/* <!-- checkboxes --> */}
                                <div className="flex flex-col gap-3 px-4 mt-1 pb-3 border-b border-gray-300">
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
                                <span className="text-lg font-semibold px-4">Order Time</span>

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
                            <div className="flex flex-col gap-3 overflow-hidden">

                                {/* <!-- searchbar --> */}
                                <form onSubmit={searchOrders} className="flex items-center justify-between w-full bg-white border border-gray-300 rounded hover:shadow flex-col sm:flex-row">
                                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" name="search" placeholder="Search your orders here" className="w-full py-2 px-3 sm:px-5 text-md outline-none flex-1 sm:rounded-l" />
                                    <button type="submit" className="w-full sm:w-max h-full text-md px-2 sm:px-4 py-2.5 text-white bg-primary-green hover:bg-blue-600 sm:rounded-r flex items-center gap-1">
                                        <SearchIcon sx={{ fontSize: "22px" }} />
                                        Search Orders
                                    </button>
                                </form>
                                {/* <!-- searchbar --> */}

                                {orders && filteredOrders.length === 0 && (
                                    <div className="flex items-center flex-col gap-2 p-8 bg-white text-md">
                                        <LazyLoadImage 
                                            src={noResult} alt="Empty Orders"
                                        />
                                        <span className="text-lg font-medium">Sorry, no results found</span>
                                        <p>Edit search or clear all filters</p>
                                    </div>
                                )}

                                {orders && filteredOrders.map((order) => {

                                    const { _id, orderStatus, orderItems, createdAt, deliveredAt } = order;

                                    return (
                                        orderItems.map((item, index) => (
                                            <OrderItem {...item} key={index} orderId={_id} orderStatus={orderStatus} createdAt={createdAt} deliveredAt={deliveredAt} />
                                        ))
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
