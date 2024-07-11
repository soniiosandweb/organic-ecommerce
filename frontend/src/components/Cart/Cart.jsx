import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import PriceSidebar from './PriceSidebar';
import SaveForLaterItem from './SaveForLaterItem';

const Cart = () => {

    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { saveForLaterItems } = useSelector((state) => state.saveForLater);

    const placeOrderHandler = () => {
        navigate('/userdetails');
    }

    return (
        <>
            <MetaData title="Shopping Cart | Fresh Organic Grocery" />
            <main className="w-full py-16 px-4">

                {/* <!-- row --> */}
                <div className="flex flex-col md:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">

                    {/* <!-- cart column --> */}
                    <div className="flex-1">

                        {/* <!-- cart items container --> */}
                        <div className="flex flex-col border border-gray-300 bg-white">
                            <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b border-gray-300">My Cart ({cartItems.length})</span>

                            {cartItems && cartItems.length === 0 && (
                                <EmptyCart />
                            )}

                            {cartItems && cartItems.map((item, index) => (
                                <CartItem key={index} {...item} inCart={true} />
                            )
                            )}

                            {/* <!-- place order btn --> */}
                            <div className="flex justify-end">
                                <button onClick={placeOrderHandler} disabled={cartItems.length < 1 ? true : false} className={`${cartItems.length < 1 ? "bg-primary-grey cursor-not-allowed" : "bg-primary-green"} w-full lg:w-1/4 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm hover:bg-black`}>Checkout</button>
                            </div>
                            {/* <!-- place order btn --> */}

                        </div>
                        {/* <!-- cart items container --> */}

                        {/* <!-- saved for later items container --> */}
                        <div className="flex flex-col mt-10 border border-gray-300 bg-white">
                            <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b border-gray-300">Saved For Later ({saveForLaterItems.length})</span>
                            {saveForLaterItems && saveForLaterItems.map((item) => (
                                <SaveForLaterItem {...item} />
                            )
                            )}
                        </div>
                        {/* <!-- saved for later container --> */}

                    </div>
                    {/* <!-- cart column --> */}

                    <PriceSidebar cartItems={cartItems} />

                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default Cart;
