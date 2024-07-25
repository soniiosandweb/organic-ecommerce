import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Actions from '../Actions';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import { Link } from 'react-router-dom';
import { getAllCategories, clearErrors, deleteCategory } from '../../../actions/categoryAction';
import { DELETE_CATEGORY_RESET } from '../../../constants/categoryConstants';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CategoriesTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { categories, error } = useSelector((state) => state.allCategories);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.category);

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
            enqueueSnackbar("Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_CATEGORY_RESET });
        }
        dispatch(getAllCategories());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteCategoryHandler = (id) => {
        dispatch(deleteCategory(id));
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
            field: "category",
            headerName: "Category Image",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-full">
                            <LazyLoadImage 
                                src={params.row.image}
                                alt={params.row.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                            {params.row.name}
                        </div>
                    </div>
                )
            },
        },
        {
            field: "name",
            headerName: "Category Name",
            minWidth: 200,
            flex: 1,
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
                    <Actions editRoute={"category"} deleteHandler={deleteCategoryHandler} id={params.row.id} />
                );
            },
        },
    ];

    const rows = [];

    categories && categories.forEach((category) => {
        rows.unshift({
            id: category._id,
            name: category.name,
            image: category.image.url,
        });
    });

    return (
        <>
            <MetaData title="Admin Categories | Fresh Organic Grocery" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center border-b pb-5 border-gray-300">
                <h1 className="text-xl font-semibold capitalize">Categories</h1>
                <Link to="/admin/new_category" className="py-2 px-5 rounded-sm shadow font-medium text-white bg-primary-green hover:bg-black">Add Category</Link>
            </div>

            <div className="bg-white rounded-sm border border-gray-300 shadow-lg w-full" style={{ height: "78vh" }}>

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

export default CategoriesTable;
