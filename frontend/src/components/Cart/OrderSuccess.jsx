import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import successfull from '../../assets/images/Transaction/success.webp';
import failed from '../../assets/images/Transaction/failed.webp';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const OrderSuccess = ({ success }) => {

    const navigate = useNavigate();
    const [time, setTime] = useState(3);

    useEffect(() => {
        if (time === 0) {
            if (success) {
                navigate("/orders")
            } else {
                navigate("/cart")
            }
            return;
        };
        const intervalId = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line
    }, [time]);

    return (
        <>
            <MetaData title={`Transaction ${success ? "Successfull" : "Failed"}`} />

            <main className="w-full">

                {/* <!-- row --> */}
                <div className="flex flex-col gap-2 items-center justify-center sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow rounded p-6 pb-12">
                    <LazyLoadImage 
                        src={success ? successfull : failed}
                        alt="Transaction Status"
                        className="w-1/2 h-60 object-contain"
                    />
                    <h1 className="text-2xl font-medium">Transaction {success ? "Successfull" : "Failed"}</h1>
                    <p className="mt-4 text-lg text-gray-800">Redirecting to {success ? "orders" : "cart"} in {time} sec</p>
                    <Link to={success ? "/orders" : "/cart"} className="bg-primary-green mt-2 py-2.5 px-6 text-white uppercase shadow hover:shadow-lg rounded-sm">go to {success ? "orders" : "cart"}</Link>
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default OrderSuccess;
