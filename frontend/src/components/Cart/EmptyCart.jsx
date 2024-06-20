import { Link } from 'react-router-dom';
import emptyCart from '../../assets/images/empty-cart.webp';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const EmptyCart = () => {
    return (
        <div className="flex items-center flex-col gap-2 m-6 font-medium">
            <div className="w-52 h-44">
               <LazyLoadImage 
                    src={emptyCart}
                    alt="Empty Cart"
                    className="w-full h-full object-contain"
                />
            </div>
            <span className="text-lg">Your cart is empty!</span>
            <p className="text-md ">Add items to it now.</p>
            <Link to="/products" className="bg-primary-green text-md text-white px-12 py-3 rounded-full shadow mt-3 hover:bg-black">Shop Now</Link>
        </div>
    );
};

export default EmptyCart;
