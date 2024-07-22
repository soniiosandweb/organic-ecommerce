import { Link } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { removeFromWishlist } from '../../actions/wishlistAction';
import { useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Product = (props) => {

    const { product } = props;

    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(removeFromWishlist(product._id));
    }

    return (
        <div className="flex gap-4 border-b p-4 sm:pb-8 w-full group overflow-hidden">
            <div className="w-1/6 h-28 flex-shrink-0">
                <LazyLoadImage 
                    className="h-full w-full object-contain" src={product.images[0].url} alt={product.name}
                />
            </div>

            {/* <!-- description --> */}
            <div className="flex flex-col gap-5 w-full p-1">
                {/* <!-- product title --> */}
                <div className="flex justify-between items-start sm:pr-5">
                    <Link to={`/product/${product._id}/`} className="flex flex-col gap-0.5">
                        <p className="text-lg font-semibold group-hover:text-primary-green sm:w-full truncate">{product.name.length > 85 ? `${product.name.substring(0, 85)}...` : product.name}</p>
                        {/* <!-- rating badge --> */}
                        <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                            <span className="text-md px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">{product.ratings} <StarIcon sx={{ fontSize: "14px" }} /></span>
                            <span>({product.numOfReviews.toLocaleString()})</span>
                        </span>
                        {/* <!-- rating badge --> */}
                    </Link>
                    <button onClick={deleteHandler} className="text-red-600 hover:text-red-700"><span><DeleteIcon /></span></button>
                </div>
                {/* <!-- product title --> */}

                {/* <!-- price desc --> */}
                <div className="flex items-center gap-2 text-lg font-medium">
                    <span>₹{product.price.toLocaleString()}</span>
                    {product.cuttedPrice !== 0 ?
                        <>
                            <span className="text-gray-500 line-through text-md">₹{product.cuttedPrice.toLocaleString()}</span>
                            <span className="text-md text-primary-green">{getDiscount(product.price, product.cuttedPrice)}%&nbsp;off</span>
                        </>
                    : null  
                    }
                </div>
                {/* <!-- price desc --> */}

            </div>
            {/* <!-- description --> */}
        </div>
    );
};

export default Product;
