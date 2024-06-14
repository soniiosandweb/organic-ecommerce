import { Link } from 'react-router-dom';
import emptyCart from '../../assets/images/empty-cart.webp';

const EmptyCart = () => {
    return (
        <div className="flex items-center flex-col gap-2 m-6 font-medium">
            <div className="w-52 h-44">
                <img draggable="false" className="w-full h-full object-contain" src={emptyCart} alt="Empty Cart" />
            </div>
            <span className="text-lg">Your cart is empty!</span>
            <p className="text-md ">Add items to it now.</p>
            <Link to="/products" className="bg-primary-green text-md text-white px-12 py-3 rounded-full shadow mt-3 hover:bg-black">Shop Now</Link>
        </div>
    );
};

export default EmptyCart;
