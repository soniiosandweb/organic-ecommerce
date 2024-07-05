import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Actions from '../Actions';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import { Link } from 'react-router-dom';
import { DELETE_COUPON_RESET } from '../../../constants/couponConstants';
import { deleteCoupon, clearErrors, getAllCouponsAdmin } from '../../../actions/couponAction';

const CouponsTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { allcoupons, error } = useSelector((state) => state.allAdminCoupons);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.coupon);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Coupon Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_COUPON_RESET });
        }
        dispatch(getAllCouponsAdmin());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteCouponHandler = (id) => {
        dispatch(deleteCoupon(id));
    }

    const columns = [
        {
            field: "id",
            headerName: "S.No.",
            minWidth: 50,
            flex: 0.4,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
        },
        {
            field: "name",
            headerName: "Coupon Code",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "discount",
            headerName: "Coupon Discount",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "percentage",
            headerName: "Discount Type",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <span>{params.row.percentage ? "% Percentage" : "Flat" }</span>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 200,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"coupon"} deleteHandler={deleteCouponHandler} id={params.row.id} />
                );
            },
        },
    ];

    const rows = [];

    allcoupons && allcoupons.forEach((coupon, index) => {
        rows.unshift({
            id: coupon._id,
            name: coupon.name,
            discount: coupon.discount,
            percentage: coupon.percentage,
        });
    });

    return (
        <>
            <MetaData title="Admin Coupons | Fresh Organic Grocery" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center border-b pb-5 border-gray-300">
                <h1 className="text-xl font-semibold capitalize">Coupons</h1>
                <Link to="/admin/new_coupon" className="py-2 px-5 rounded-sm shadow font-medium text-white bg-primary-green hover:bg-black">Add Coupon</Link>
            </div>

            <div className="bg-white rounded-sm border border-gray-300 shadow-lg w-full" style={{ height: "78vh" }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                    disableSelectionOnClick 
                />
            </div>
        </>
    );
};

export default CouponsTable;
