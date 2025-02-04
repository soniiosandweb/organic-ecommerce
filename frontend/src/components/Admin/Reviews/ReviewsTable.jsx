import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, deleteReview, getAdminProducts, getAllReviews } from '../../../actions/productAction';
import Rating from '@mui/material/Rating';
import Actions from '../Actions';
import { DELETE_REVIEW_RESET, REMOVE_REVIEWS_DETAILS } from '../../../constants/productConstants';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';

const ReviewsTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [productId, setProductId] = useState("");

    const { reviews, error } = useSelector((state) => state.reviews);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.review);
    const { products } = useSelector((state) => state.products);

    const productListChange = (e) => {
        if(e.target.value === ""){
            setProductId("");
            dispatch({ type: REMOVE_REVIEWS_DETAILS});
        } else {
            setProductId(e.target.value)
        }
        
    }

    useEffect(() => {
       // if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        //}
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Review Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_REVIEW_RESET });
        }

        dispatch(getAdminProducts());

    }, [dispatch, error, deleteError, isDeleted, productId, enqueueSnackbar]);

    const deleteReviewHandler = (id, product) => {
        dispatch(deleteReview(id, product));
    }

    const columns = [
        {
            field: "id",
            headerName: "S.No.",
            minWidth: 100,
            flex: 0.5,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
        },
        {
            field: "product",
            headerName: "Product",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "user",
            headerName: "User",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 200,
            flex: 0.3,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                return <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
            }
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"review"} deleteHandler={() => deleteReviewHandler(params.row.id, params.row.productId)} id={params.row.id} />
                );
            },
        },
    ];

    const rows = [];

    reviews && reviews.forEach((rev) => {
        rows.push({
            id: rev._id,
            product: rev.product,
            rating: rev.rating,
            comment: rev.comment,
            user: rev.user,
            productId: rev.productId,
        });
    });

    return (
        <>
            <MetaData title="Admin Reviews | Fresh Organic Grocery" />

            {loading && <BackdropLoader />}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-12 pb-5 border-b border-gray-300">
                <h1 className="text-xl font-semibold capitalize">reviews</h1>
                <select value={productId} onChange={(e) => productListChange(e)} className="outline-none rounded px-4 py-2.5 w-full border border-gray-300">
                    <option value="">Select Product</option>
                    {products &&  products.map((el, i) => (
                        <option value={el._id} key={i}>
                            {el.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="bg-white rounded-sm border border-gray-300 w-full" style={{ height: "78vh" }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                    disableSelectionOnClick 
                    autoPageSize
                    pageSizeOptions={[5, 10, 25]}
                    pagination
                />
            </div>
        </>
    );
};

export default ReviewsTable;