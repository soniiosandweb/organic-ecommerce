import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clearErrors, getFaqDetails, updateFaq } from "../../../actions/faqAction";
import { REMOVE_FAQ_DETAILS, UPDATE_FAQ_RESET } from "../../../constants/faqConstants";
import { TextField } from "@mui/material";
import BackdropLoader from "../../Layouts/BackdropLoader";
import MetaData from "../../Layouts/MetaData";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from "react";

const UpdateFaq = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const faqId = params.id;

    const { loading, faq, error } = useSelector((state) => state.faqDetails);
    const { loading: updateLoading, isUpdated, error: updateError } = useSelector((state) => state.faqs);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

   
    const newFaqSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("title", title);
        formData.set("description", description);

        dispatch(updateFaq(params.id, formData));
    }

    useEffect(() => {
       
        if (faq && faq._id !== faqId) {
            dispatch(getFaqDetails(faqId));
        } else {
            setTitle(faq.title);
            setDescription(faq.description)
        }
        
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("FAQ Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_FAQ_RESET });
            dispatch({ type: REMOVE_FAQ_DETAILS});
            navigate('/admin/faqs');
        }
    }, [dispatch, error, updateError, isUpdated, faqId, faq, navigate, enqueueSnackbar]);

    return(
        <>
            <MetaData title="Admin: Update FAQ | Fresh Organic Grocery" />

            {loading && <BackdropLoader />}
            {updateLoading && <BackdropLoader />}

            <Link to="/admin/faqs" className="ml-1 flex w-max items-center gap-0 font-semibold text-primary-green uppercase hover:text-black"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>

            <form onSubmit={newFaqSubmitHandler} encType="multipart/form-data" className="flex flex-col bg-white border border-gray-300 gap-5 shadow p-3 lg:p-5" id="faqform">

                <div className="flex flex-col gap-3 w-full lg:w-2/3">
                    <TextField
                        label="FAQ Title"
                        variant="outlined"
                        size="medium"
                        required
                        value={title}
                        name='faq_title'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    
                </div>

                <div className="flex flex-col gap-3 w-full lg:w-2/3">
                    <TextField
                        label="Description"
                        multiline
                        rows={8}
                        required
                        variant="outlined"
                        size="large"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-1/3">
                    <input form="faqform" type="submit" className="bg-primary-green uppercase p-3 text-white font-medium rounded-sm shadow hover:bg-black cursor-pointer" value="Submit" />
                </div>

            </form>
        </>
    )
}

export default UpdateFaq