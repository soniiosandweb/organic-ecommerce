import { Rating } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { deleteReview, clearErrors, getUserReviews } from "../../actions/productAction";

const ReviewItem = (props) => {

    const { product, review } = props;

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { isDeleted, error: deleteError } = useSelector((state) => state.review);
    const { user } = useSelector(state => state.user);

    useEffect(() => {

        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Review Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_REVIEW_RESET });
            dispatch(getUserReviews(user._id));
        }

    }, [dispatch, deleteError, isDeleted, enqueueSnackbar, user])

    const deleteReviewHandler = (id, productId) => {
        dispatch(deleteReview(id, productId));
    }

    return (
        <div className="flex gap-4 border-b p-4 sm:pb-8 w-full group overflow-hidden">
            {review.map((review, index) => (
                <div className="flex w-full px-2 sm:px-5 justify-between items-start gap-3 text-md" key={index}>
                    <div className="flex flex-col gap-2">
                        <Rating name="read-only" value={review.rating} readOnly size="small" precision={0.5} />
                        <p>{review.comment}</p>
                        <p className="text-md">Product: <a href={`/product/${product._id}`} className="font-semibold hover:text-primary-green">{product.name}</a></p>
                    </div>
                    <button className="text-red-600 hover:text-red-700" onClick={() => deleteReviewHandler(review._id, product._id)}><span><DeleteIcon /></span></button>
                </div>
            ))}
        </div>
    );
}

export default ReviewItem