import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { getDiscount } from '../../utils/functions';
import { saveForLater } from '../../actions/saveForLaterAction';
import { Link } from 'react-router-dom';

const CartItem = ({ product, name, seller, price, cuttedPrice, image, stock, quantity, inCart }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (quantity >= stock) {
            enqueueSnackbar("Maximum Order Quantity", { variant: "warning" });
            return;
        };
        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (quantity <= 1) return;
        dispatch(addItemsToCart(id, newQty));
    }
    
    const removeCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
        enqueueSnackbar("Product Removed From Cart", { variant: "success" });
    }

    const saveForLaterHandler = (id) => {
        dispatch(saveForLater(id));
        removeCartItem(id);
        enqueueSnackbar("Saved For Later", { variant: "success" });
    }

    return (
        <div className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b border-gray-300 overflow-hidden" key={product}>

            <div className="flex flex-col sm:flex-row gap-5 items-stretch w-full group">
                {/* <!-- product image --> */}
                <div className="w-full sm:w-1/6 h-28 flex-shrink-0">
                    <Link to={`/product/${product}/`}><img draggable="false" className="h-full w-full object-contain" src={image} alt={name} /></Link>
                </div>
                {/* <!-- product image --> */}

                {/* <!-- description --> */}
                <div className="flex flex-col sm:gap-5 w-full pr-6">
                    {/* <!-- product title --> */}
                    <div className="flex flex-col lg:flex-row justify-between items-start pr-5 gap-3 lg:gap-0">
                        <div className="flex flex-col gap-2 sm:w-3/5">
                            <Link to={`/product/${product}/`}>
                                <p className="text-xl font-semibold group-hover:text-primary-green">{name.length > 42 ? `${name.substring(0, 42)}...` : name}</p>
                            </Link>
                            {/* <!-- price desc --> */}
                            <div className="flex gap-2 text-lg font-medium">
                                <span>₹{(price * quantity).toLocaleString()}</span>
                                <span className="text-gray-500 line-through font-normal">₹{(cuttedPrice * quantity).toLocaleString()}</span>
                                <span className="text-primary-green">{getDiscount(price, cuttedPrice)}%&nbsp;off</span>
                            </div>
                            {/* <!-- price desc --> */}

                            {/* <!-- quantity --> */}
                            <div className="flex gap-1 items-center">
                                <span onClick={() => decreaseQuantity(product, quantity)} className="w-7 h-7 text-xl font-medium bg-gray-100 rounded-full border flex items-center justify-center cursor-pointer border-gray-300"><p>-</p></span>
                                <input className="w-11 border outline-none text-center rounded-sm py-0.5 text-black font-medium text-md qtyInput border-gray-300" value={quantity} disabled />
                                <span onClick={() => increaseQuantity(product, quantity, stock)} className="w-7 h-7 text-xl font-medium bg-gray-100 rounded-full border flex items-center justify-center cursor-pointer border-gray-300">+</span>
                            </div>
                            {/* <!-- quantity --> */}

                        </div>

                        <div className="flex flex-col gap-3 my-auto">
                            {/* <p className="text-sm">Delivery by {getDeliveryDate()} | <span className="text-primary-green">Free</span> <span className="line-through">₹{quantity * 40}</span></p> */}
                            {inCart && (
                                <>
                                <button onClick={() => saveForLaterHandler(product)} className="font-bold text-primary-green hover:text-black text-start lg:text-center">SAVE FOR LATER</button>
                                <button onClick={() => removeCartItem(product)} className="text-red-600 font-bold hover:text-red-700 text-start lg:text-center">REMOVE</button>
                                </>
                            )}
                        </div>

                    </div>
                    {/* <!-- product title --> */}

                </div>
                {/* <!-- description --> */}
            </div>

        </div>
    );
};

export default CartItem;
