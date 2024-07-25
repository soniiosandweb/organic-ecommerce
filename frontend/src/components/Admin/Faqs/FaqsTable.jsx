import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../Layouts/MetaData";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { clearErrors, deleteFaq, getAllFaqs } from "../../../actions/faqAction";
import { DELETE_FAQ_RESET } from "../../../constants/faqConstants";
import BackdropLoader from "../../Layouts/BackdropLoader";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Actions from "../Actions";

const FaqsTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { faqs, error } = useSelector((state) => state.allFaqs);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.faqs);

    useEffect(() => {
        if(error){
            enqueueSnackbar(error, {variant: "error"});
            dispatch(clearErrors());
        }
        if(deleteError){
            enqueueSnackbar(error, {variant: "error"});
            dispatch(clearErrors());
        }
        if(isDeleted){
            enqueueSnackbar("FAQ Deleted Successfully", {variant: "success"});
            dispatch({ type: DELETE_FAQ_RESET });
        }
        dispatch(getAllFaqs());
    }, [dispatch, enqueueSnackbar, error, isDeleted, deleteError]);

    const deleteFaqHandler = (id) => {
        dispatch(deleteFaq(id));
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
            field: "title",
            headerName: "FAQ Title",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "description",
            headerName: "FAQ Description",
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
                    <Actions editRoute={"faq"} deleteHandler={deleteFaqHandler} id={params.row.id} />
                );
            },
        },
    ];

    const rows = [];

    faqs && faqs.forEach((faq, index) => {
        rows.unshift({
            id: faq._id,
            title: faq.title,
            description: faq.description,
        });
    });

    return(
        <>
            <MetaData title={"Admin FAQs | Fresh Organic Grocery"} />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center border-b pb-5 border-gray-300">
                <h1 className="text-xl font-semibold capitalize">FAQs</h1>
                <Link to="/admin/new_faq" className="py-2 px-5 rounded-sm shadow font-medium text-white bg-primary-green hover:bg-black">Add FAQ</Link>
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
    )
}

export default FaqsTable;