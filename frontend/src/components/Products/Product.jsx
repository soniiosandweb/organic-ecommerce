import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import { useSnackbar } from 'notistack';
import Rating from '@mui/material/Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { addItemsToCart } from '../../actions/cartAction';
import Tooltip from '@mui/material/Tooltip';

const Product = ({ _id, name, images, ratings, numOfReviews, price, cuttedPrice, stock }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { wishlistItems } = useSelector((state) => state.wishlist);
    const { cartItems } = useSelector((state) => state.cart);

    const itemInWishlist = wishlistItems.some((i) => i.product === _id);

    const itemInCart = cartItems.some((i) => i.product === _id);

    const goToCart = () => {
        navigate('/cart');
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(_id));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(_id));
            enqueueSnackbar("Remove From Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(_id));
            enqueueSnackbar("Added To Wishlist", { variant: "success" });
        }
    }

    return (

        <div className="gap-2 relative w-full h-full">

            <div className="flex flex-col items-center gap-2 p-4 relative border border-gray-300 shadow-lg w-full h-full">
                {/* <!-- image & product title --> */}
                <Link to={`/product/${_id}/`} className="flex flex-col items-center text-center group w-full">
                    <div className="w-full max-h-96 h-full bg-[#f4f4f4]">
                        <LazyLoadImage 
                           className="w-full h-full object-contain" src={images[0].url} alt={name}
                        />
                    </div>
                    <h2 className="text-xl mt-4 font-semibold group-hover:text-primary-green">{name.length > 50 ? `${name.substring(0, 50)}...` : name}</h2>
                </Link>
                {/* <!-- image & product title --> */}

                {/* <!-- product description --> */}
                <div className="flex flex-col gap-2 items-center w-full">
                    {/* <!-- rating badge --> */}
                    <span className="text-sm text-black font-medium flex gap-2 items-center">
                        <Rating name="read-only" value={ratings} readOnly size="medium" precision={0.5} />
                    </span>
                    {/* <!-- rating badge --> */}

                    {/* <!-- price container --> */}
                    <div className="flex items-center gap-1.5 text-md font-medium">
                        <span>₹{price.toLocaleString()}</span>
                        {cuttedPrice !== 0 ?
                            <>
                                <span className="text-gray-500 line-through text-md">₹{cuttedPrice.toLocaleString()}</span>
                                <span className="text-md text-primary-green">{getDiscount(price, cuttedPrice)}%&nbsp;off</span>
                            </>
                        : null  
                        }
                    </div>
                    {/* <!-- price container --> */}

                    <div className="flex items-center gap-3 text-md font-medium">

                        {/* <!-- add to cart --> */}
                        {stock > 0 && (
                            <Tooltip title={itemInCart ? "View cart" : "Add to cart"} placement="top" arrow>
                                <span onClick={itemInCart ? goToCart : addToCartHandler} className={`${itemInCart ? "text-black" : "hover:text-primary-green text-gray-300"} cursor-pointer`}><LocalMallOutlinedIcon sx={{ fontSize: "24px" }} /></span>
                            </Tooltip>
                        )}
                        {/* <!-- add to cart --> */}

                        {/* <!-- wishlist badge --> */}
                        <Tooltip title="Wishlist" placement="top" arrow>
                            <span onClick={addToWishlistHandler} className={`${itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"} cursor-pointer`}><FavoriteIcon sx={{ fontSize: "24px" }} /></span>
                        </Tooltip>
                        {/* <!-- wishlist badge --> */}

                        <Tooltip title="View" placement="top" arrow>
                            <Link to={`/product/${_id}/`} className="flex flex-col items-center text-center group w-full hover:text-black text-gray-300">
                                <VisibilityOutlinedIcon sx={{ fontSize: "24px" }}/>
                            </Link>
                        </Tooltip>
                    </div>
                </div>
                {/* <!-- product description --> */}

                
            </div>

        </div>
    );
};

export default Product;
