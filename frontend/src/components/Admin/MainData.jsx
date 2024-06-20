import { useEffect } from 'react';
import Chart from 'chart.js/auto'
import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2';
import { getAdminProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';
// import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import { getAllCategories } from '../../actions/categoryAction';

const MainData = () => {

    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.users);
    const { categories } = useSelector((state) => state.allCategories);

    let outOfStock = 0;

    products?.forEach((item) => {
        if (item.stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
        dispatch(getAllCategories());
    }, [dispatch]);

    let totalAmount = orders?.reduce((total, order) => total + order.totalPrice, 0);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date();
    const lineState = {
        labels: months,
        datasets: [
            {
                label: `Sales in ${date.getFullYear() - 2}`,
                borderColor: '#8A39E1',
                backgroundColor: '#8A39E1',
                data: months.map((m, i) => orders?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear() - 2).reduce((total, od) => total + od.totalPrice, 0)),
            },
            {
                label: `Sales in ${date.getFullYear() - 1}`,
                borderColor: 'orange',
                backgroundColor: 'orange',
                data: months.map((m, i) => orders?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear() - 1).reduce((total, od) => total + od.totalPrice, 0)),
            },
            {
                label: `Sales in ${date.getFullYear()}`,
                borderColor: '#008000',
                backgroundColor: '#008000',
                data: months.map((m, i) => orders?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear()).reduce((total, od) => total + od.totalPrice, 0)),
            },
        ],
    };

    const statuses = ['Processing', 'Shipped', 'Delivered'];

    const pieState = {
        labels: statuses,
        datasets: [
            {
                backgroundColor: ['#9333ea', '#facc15', '#008000'],
                hoverBackgroundColor: ['#a855f7', '#fde047', '#86efac'],
                data: statuses.map((status) => orders?.filter((item) => item.orderStatus === status).length),
            },
        ],
    };

    const doughnutState = {
        labels: ['Out of Stock', 'In Stock'],
        datasets: [
            {
                backgroundColor: ['#ef4444', '#008000'],
                hoverBackgroundColor: ['#dc2626', '#16a34a'],
                data: [outOfStock, (products && products.length ? products.length : 0) - outOfStock],
            },
        ],
    };

    const barState = {
        labels: categories && categories.map((cat) => cat.name),
        datasets: [
            {
                label: "Products",
                borderColor: '#008000',
                backgroundColor: '#008000',
                hoverBackgroundColor: 'orange',
                data: categories && categories.map((cat) => products?.filter((item) => item.category._id === cat._id).length),
            },
        ],
    };

    
    return (
        <>
            <MetaData title="Admin Dashboard | Organic" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
                <div className="flex flex-col bg-purple-600 text-white gap-2 rounded-md shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Sales Amount</h4>
                    <h2 className="text-2xl font-bold">₹{totalAmount?.toLocaleString()}</h2>
                </div>
                <div className="flex flex-col bg-red-500 text-white gap-2 rounded-md shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Orders</h4>
                    <h2 className="text-2xl font-bold">{orders?.length}</h2>
                </div>
                <div className="flex flex-col bg-yellow-500 text-white gap-2 rounded-md shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Products</h4>
                    <h2 className="text-2xl font-bold">{products?.length}</h2>
                </div>
                <div className="flex flex-col bg-primary-green text-white gap-2 rounded-md shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Users</h4>
                    <h2 className="text-2xl font-bold">{users?.length}</h2>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-3 lg:gap-8 w-full">
                <div className="w-full md:w-2/3 bg-white rounded-md border border-gray-300 h-auto shadow-lg p-2">
                    <Line data={lineState} />
                </div>

                <div className="w-full md:w-1/3 bg-white rounded-md border border-gray-300 shadow-lg py-4 text-center">
                    <span className="font-medium uppercase text-gray-800">Order Status</span>
                    <Pie data={pieState} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-3 lg:gap-8 w-full mb-6">
                <div className="w-full md:w-2/3 bg-white rounded-md border border-gray-300 h-auto shadow-lg p-2">
                    <Bar data={barState} />
                </div>

                <div className="w-full md:w-1/3 bg-white rounded-md border border-gray-300 shadow-lg py-4 text-center">
                    <span className="font-medium uppercase text-gray-800">Stock Status</span>
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </>
    );
};

export default MainData;
