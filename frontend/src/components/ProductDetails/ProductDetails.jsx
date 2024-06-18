import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from '../Home/Banner/Banner';
import Loader from '../Layouts/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CachedIcon from '@mui/icons-material/Cached';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { addItemsToCart } from '../../actions/cartAction';
import { getDiscount } from '../../utils/functions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import MetaData from '../Layouts/MetaData';
import DealSlider from '../Home/DealSlider/DealSlider';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    // reviews toggle
    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const productId = params.id;
    const itemInWishlist = wishlistItems.some((i) => i.product === productId);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(productId));
            enqueueSnackbar("Remove From Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(productId));
            enqueueSnackbar("Added To Wishlist", { variant: "success" });
        }
    }

    const reviewSubmitHandler = () => {
        if (rating === 0 || !comment.trim()) {
            enqueueSnackbar("Empty Review", { variant: "error" });
            return;
        }
        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);
        dispatch(newReview(formData));
        setOpen(false);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    const handleDialogClose = () => {
        setOpen(!open);
    }

    const itemInCart = cartItems.some((i) => i.product === productId);

    const goToCart = () => {
        navigate('/cart');
    }

    const buyNow = () => {
        addToCartHandler();
        navigate('/shipping');
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(productId));
        // eslint-disable-next-line
    }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getSimilarProducts(product.category ? product.category._id : null));
    }, [dispatch, product]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={product.name} />
                    <main className="w-full sm:mt-0">
                        <div className="py-16 sm:w-11/12 m-auto px-4 w-full relative z-10">
                            {/* <!-- product image & description container --> */}
                            <div className="w-full flex flex-col sm:flex-row gap-8 bg-white relative pb-10">

                                {/* <!-- image wrapper --> */}
                                <div className="w-full md:w-2/5">
                                    {/* <!-- imgbox --> */}
                                    <div className="flex flex-col gap-3 sm:sticky top-16">
                                        <div className="w-full h-full p-5 border relative">
                                            <Slider {...settings} className='arrows-position-0'>
                                                {product.images && product.images.map((item, i) => (
                                                    <img draggable="false" className="w-full object-contain" src={item.url} alt={product.name} key={i} />
                                                ))}
                                            </Slider>
                                            <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                                                <span onClick={addToWishlistHandler} className={`${itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"} cursor-pointer`}><FavoriteIcon sx={{ fontSize: "24px" }} /></span>
                                            </div>
                                        </div>

                                        <div className="w-full flex gap-3 flex-col sm:flex-row">
                                            {/* <!-- add to cart btn --> */}
                                            {product.stock > 0 && (
                                                <button onClick={itemInCart ? goToCart : addToCartHandler} className="p-4 w-full sm:w-1/2 flex items-center justify-center gap-2 text-white bg-primary-green rounded-full shadow hover:shadow-lg hover:bg-black font-semibold">
                                                    <ShoppingCartIcon />
                                                    {itemInCart ? "ADD TO CART" : "ADD TO CART"}
                                                </button>
                                            )}
                                            <button onClick={buyNow} disabled={product.stock < 1 ? true : false} className={product.stock < 1 ? "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-full hover:shadow-lg" : "p-4 w-full sm:w-1/2 flex items-center justify-center gap-2 text-white bg-black rounded-full hover:shadow-lg hover:bg-primary-green font-semibold"}>
                                                <FlashOnIcon />
                                                {product.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                                            </button>
                                            {/* <!-- add to cart btn --> */}
                                        </div>

                                    </div>
                                    {/* <!-- imgbox --> */}
                                </div>
                                {/* <!-- image wrapper --> */}

                                {/* <!-- product desc wrapper --> */}
                                <div className="flex-1 py-2">

                                    {/* <!-- whole product description --> */}
                                    <div className="flex flex-col gap-4">

                                        <h1 className="text-4xl font-semibold">{product.name}</h1>
                                        {/* <!-- rating badge --> */}
                                        <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                                            <span className="text-md px-1.5 py-0.5 bg-primary-yellow rounded-sm text-white flex items-center gap-0.5">{product.ratings && product.ratings.toFixed(1)} <StarIcon sx={{ fontSize: "12px" }} /></span>
                                            <span>{product.numOfReviews} Reviews</span>
                                        </span>
                                        {/* <!-- rating badge --> */}

                                        {/* <!-- price desc --> */}
                                        <h2 className="flex items-baseline gap-2 text-3xl font-medium">
                                            <span className="text-black text-3xl font-medium">₹{product.price?.toLocaleString()}</span>
                                            <span className="text-base text-gray-500 line-through font-medium text-xl">₹{product.cuttedPrice?.toLocaleString()}</span>
                                            <span className="text-base text-primary-green font-medium text-xl">{getDiscount(product.price, product.cuttedPrice)}%&nbsp;off</span>
                                        </h2>

                                        {product.stock <= 10 && product.stock > 0 && (
                                            <span className="text-red-500 text-sm font-medium">Hurry, Only {product.stock} left!</span>
                                        )}
                                        {/* <!-- price desc --> */}

                                        {/* <!-- highlights & services details --> */}
                                        <div className="flex flex-col sm:flex-col justify-between">
                                            {/* <!-- category details --> */}
                                            <div className="flex gap-16 mt-4 items-stretch text-md">
                                                <p className="text-black font-medium">Category</p>

                                                <p className="flex flex-col gap-2 w-64 text-black font-medium">
                                                    {product.category ? product.category.name : null}
                                                </p>
                                            </div>
                                            {/* <!-- category details --> */}

                                            {/* <!-- highlights details --> */}
                                            <div className="flex gap-16 mt-4 items-stretch text-md">
                                                <p className="text-black font-medium">Highlights</p>

                                                <ul className="list-disc flex flex-col gap-2 w-64">
                                                    {product.highlights?.map((highlight, i) => (
                                                        <li key={i}>
                                                            <p className="text-black font-medium">{highlight}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {/* <!-- highlights details --> */}

                                            {/* <!-- services details --> */}
                                            <div className="flex gap-16 mt-4 mr-6 items-stretch text-md">
                                                <p className="text-black font-medium">Services</p>
                                                <ul className="flex flex-col gap-2">
                                                    <li>
                                                        <p className="flex items-center gap-3 text-black font-medium"><span className="text-primary-green"><VerifiedUserIcon sx={{ fontSize: "18px" }} /></span> {product.warranty} Year</p>
                                                    </li>
                                                    <li>
                                                        <p className="flex items-center gap-3 text-black font-medium"><span className="text-primary-green"><CachedIcon sx={{ fontSize: "18px" }} /></span> 7 Days Replacement Policy</p>
                                                    </li>
                                                    <li>
                                                        <p className="flex items-center gap-3 text-black font-medium"><span className="text-primary-green"><CurrencyRupeeIcon sx={{ fontSize: "18px" }} /></span> Cash on Delivery available</p>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <!-- services details --> */}
                                        </div>
                                        {/* <!-- highlights & services details --> */}

                                        {/* <!-- border box --> */}
                                        <div className="w-full mt-6 rounded-sm border flex flex-col">
                                            <h3 className="px-6 py-4 border-b text-xl font-semibold">Product Description</h3>
                                            <div className="p-6">
                                                <p className="text-md">{product.description}</p>
                                            </div>
                                        </div>
                                        {/* <!-- border box --> */}

                                    </div>

                                </div>
                                {/* <!-- product desc wrapper --> */}

                            </div>
                            {/* <!-- product image & description container --> */}

                            {/* <!-- reviews border box --> */}
                            <div className="w-full mt-8 md:mt-20 rounded-sm border flex flex-col">
                                <div className="flex justify-between items-center border-b px-6 py-4 flex-col sm:flex-row gap-5">
                                    <h2 className="text-2xl font-medium">Ratings & Reviews</h2>
                                    <button onClick={handleDialogClose} className="shadow bg-primary-green text-white px-4 py-2 rounded-full hover:bg-black hover:shadow-lg">Rate Product</button>
                                </div>

                                <Dialog aria-labelledby='review-dialog'  open={open} onClose={handleDialogClose}>

                                    <DialogTitle className="border-b">Submit Review</DialogTitle>
                                    
                                    <DialogContent className="flex flex-col m-1 gap-4">
                                        <Rating
                                            onChange={(e) => setRating(e.target.value)}
                                            value={rating}
                                            size='large'
                                            precision={0.5}
                                        />
                                        <TextField
                                            label="Review"
                                            multiline
                                            rows={3}
                                            sx={{ width: 400 }}
                                            size="small"
                                            variant="outlined"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </DialogContent>
                                
                                    <DialogActions>
                                        <button onClick={handleDialogClose} className="py-2 px-6 rounded-full shadow bg-red-700 hover:bg-black text-white uppercase">Cancel</button>
                                        <button onClick={reviewSubmitHandler} className="py-2 px-6 rounded-full bg-primary-green hover:bg-black text-white shadow uppercase">Submit</button>
                                    </DialogActions>
                                </Dialog>

                                <div className="flex items-center border-b">
                                    <h2 className="px-6 py-3 text-3xl font-semibold">{product.ratings && product.ratings.toFixed(1)}<StarIcon /></h2>
                                    <p className="text-lg text-gray-500">({product.numOfReviews}) Reviews</p>
                                </div>

                                {viewAll ?
                                    product.reviews?.map((rev, i) => (
                                        <div className="flex flex-col gap-2 py-4 px-6 border-b text-md" key={i}>
                                            <Rating name="read-only" value={rev.rating} readOnly size="small" precision={0.5} />
                                            <p>{rev.comment}</p>
                                            <span className="text-md">by {rev.name}</span>
                                        </div>
                                    )).reverse()
                                    :
                                    product.reviews?.slice(-3).map((rev, i) => (
                                        <div className="flex flex-col gap-2 py-4 px-6 border-b text-md" key={i}>
                                            <Rating name="read-only" value={rev.rating} readOnly size="small" precision={0.5} />
                                            <p>{rev.comment}</p>
                                            <span className="text-md">by {rev.name}</span>
                                        </div>
                                    )).reverse()
                                }
                                {product.reviews?.length > 3 &&
                                    <button onClick={() => setViewAll(!viewAll)} className="w-1/3 m-2 rounded-sm shadow hover:shadow-lg py-2 bg-primary-green text-white">{viewAll ? "View Less" : "View All"}</button>
                                }
                            </div>
                            {/* <!-- reviews border box --> */}

                            {/* Sliders */}
                            <div className="flex flex-col gap-3 mt-10">
                                <DealSlider title={"Related Products"} id={product._id} />
                            </div>
                        </div>
                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;
