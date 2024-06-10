import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../actions/cartAction';
import { removeFromSaveForLater } from '../../actions/saveForLaterAction';
import { getDiscount } from '../../utils/functions';
import { Link } from 'react-router-dom';

const SaveForLaterItem = ({ product, name, seller, price, cuttedPrice, image, stock, quantity }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const removeFromSaveForLaterHandler = (id) => {
        dispatch(removeFromSaveForLater(id));
        enqueueSnackbar("Removed From Save For Later", { variant: "success" });
    }

    const moveToCartHandler = (id, quantity) => {
        dispatch(addItemsToCart(id, quantity));
        removeFromSaveForLaterHandler(id);
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    return (
        <div className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b" key={product}>

            <div className="flex flex-col sm:flex-row gap-5 items-stretch w-full" href="#">
                {/* <!-- product image --> */}
                <div className="w-full sm:w-1/6 h-28 flex-shrink-0">
                    <Link to={`/product/${product}/`}><img draggable="false" className="h-full w-full object-contain" src={image} alt={name} /></Link>
                </div>
                {/* <!-- product image --> */}

                {/* <!-- description --> */}
                <div className="flex flex-col gap-1 sm:gap-5 w-full p-1 pr-6">
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
                                <span className="w-7 h-7 text-xl font-medium bg-gray-100 rounded-full border flex items-center justify-center cursor-not-allowed border-gray-300"><p>-</p></span>
                                <input className="w-11 border outline-none text-center rounded-sm py-0.5 text-black font-medium text-md qtyInput border-gray-300" value={quantity} disabled />
                                <span className="w-7 h-7 text-xl font-medium bg-gray-100 rounded-full border flex items-center justify-center cursor-not-allowed border-gray-300">+</span>
                            </div>
                            {/* <!-- quantity --> */}

                        </div>                                                      

                        <div className="flex flex-col gap-3 my-auto">
                            <button onClick={() => moveToCartHandler(product, quantity)} className="font-bold text-primary-green hover:text-black text-start lg:text-center">MOVE TO CART</button>
                            <button onClick={() => removeFromSaveForLaterHandler(product)} className="text-red-600 font-bold hover:text-red-700 text-start lg:text-center">REMOVE</button>
                        </div>
                    </div>
                    {/* <!-- product title --> */}

                </div>
                {/* <!-- description --> */}
            </div>

        </div>
    );
};

export default SaveForLaterItem;
