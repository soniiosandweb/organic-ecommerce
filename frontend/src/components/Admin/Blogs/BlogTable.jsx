import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import Actions from '../Actions';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { clearErrors, deleteBlog, getAdminBlogs } from '../../../actions/blogAction';
import { DELETE_BLOG_RESET } from '../../../constants/blogConstants';

const BlogTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { blogs, error } = useSelector((state) => state.blogs);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.blog);

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
            enqueueSnackbar("Blog Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_BLOG_RESET });
        }
        dispatch(getAdminBlogs());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteBlogHandler = (id) => {
        dispatch(deleteBlog(id));
    }

    const columns = [
        {
            field: "id",
            headerName: "S.No.",
            minWidth: 100,
            flex: 0.4,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full">
                            <LazyLoadImage 
                                src={params.row.image}
                                alt={params.row.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        {params.row.name}
                    </div>
                )
            },
        },
        {
            field: "description",
            headerName: "Description",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "category",
            headerName: "Category",
            minWidth: 100,
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <span>{params.row.category !== undefined ? params.row.category : null}</span>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"blog"} deleteHandler={deleteBlogHandler} id={params.row.id} />
                );
            },
        },
    ];

    const rows = [];

    blogs && blogs.forEach((item) => {
        rows.unshift({
            id: item._id,
            name: item.name,
            image: item.image.url,
            description: item.description,
            category: item.category,
        });
    });

    return (
        <>
            <MetaData title="Admin Blogs | Fresh Organic Grocery" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center border-b pb-5 border-gray-300">
                <h1 className="text-xl font-semibold capitalize">Blogs</h1>
                <Link to="/admin/new_blog" className="py-2 px-5 rounded-sm shadow font-medium text-white bg-primary-green hover:bg-black">Add Blog</Link>
            </div>
            <div className="bg-white rounded-sm border border-gray-300 w-full" style={{ height: "78vh" }}>

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

export default BlogTable;