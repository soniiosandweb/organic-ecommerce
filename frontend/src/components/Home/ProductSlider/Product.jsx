import { getDiscount } from '../../../utils/functions';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addWishlistItem, clearErrors, deleteWishlist, getWIshlistItems } from '../../../actions/wishlistAction';
import { useSnackbar } from 'notistack';
import Rating from '@mui/material/Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Tooltip from '@mui/material/Tooltip';
import { addItemsToCart } from '../../../actions/cartAction';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useEffect } from 'react';
import { ADD_WISHLIST_RESET, GET_WISHLIST_RESET, REMOVE_WISHLIST_RESET } from '../../../constants/wishlistConstants';

const Product = (props) => {

    const { _id, name, images, ratings, price, cuttedPrice, stock } = props;

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const { user } = useSelector((state) => state.user);
    const { wishlists, loading: wishlistLoading, error: wishlistError } = useSelector((state) => state.wishlists);
    const { isDeleted, error: deleteError } = useSelector((state) => state.wishlistItem);
    const { success: isAdded, error: addError } = useSelector((state) => state.newWIshlist);

    const itemExist = wishlists && wishlists.some((i) => i.product._id === _id);

    const itemInCart = cartItems.some((i) => i.product === _id);

    const goToCart = () => {
        navigate('/cart');
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(_id));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    const addToWishlistHandler = () => {
        if(user && user._id){
            if(itemExist){
                const item = wishlists.filter((i) => i.product._id === _id);
                dispatch(deleteWishlist(item[0]._id));
                enqueueSnackbar("Remove From Wishlist", { variant: "success" });
            } else {
                const data = {
                    product: _id,
                    user: user._id,
                };
                dispatch(addWishlistItem(data));
                enqueueSnackbar("Added To Wishlist", { variant: "success" });
            }
        } else {
            enqueueSnackbar("Please Login to add item in wishlist", { variant: "warning" });
        }
    }

    useEffect(() => {
        if(user && user._id && wishlistLoading === undefined){
            dispatch(getWIshlistItems(user._id));
        }
        if(wishlistError){
            dispatch({ type: GET_WISHLIST_RESET });
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (addError) {
            enqueueSnackbar(addError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            
            dispatch({ type: REMOVE_WISHLIST_RESET });
            dispatch(getWIshlistItems(user._id));
        }
        if (isAdded) {
            
            dispatch({ type: ADD_WISHLIST_RESET });
            dispatch(getWIshlistItems(user._id));
        }
    }, [dispatch, wishlistLoading, user, deleteError, isDeleted, isAdded, addError, enqueueSnackbar, wishlistError])

    return (
        <div className="gap-2 px-4 relative w-full h-full">

            <div className="flex flex-col items-center gap-2 p-4 relative border shadow-lg w-full h-full">
                {/* <!-- image & product title --> */}
                <Link to={`/product/${_id}/`} className="flex flex-col items-center text-center group w-full">
                    <div className="w-full h-72">
                        <LazyLoadImage 
                            src={images[0].url}
                            alt={name}
                            className="w-full h-full object-cover"
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
                            <span onClick={addToWishlistHandler} className={`${itemExist ? "text-red-500" : "hover:text-red-500 text-gray-300"} cursor-pointer`}><FavoriteIcon sx={{ fontSize: "24px" }} /></span>
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
