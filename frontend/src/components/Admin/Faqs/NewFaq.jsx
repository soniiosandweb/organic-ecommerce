import { Link, useNavigate } from "react-router-dom";
import BackdropLoader from "../../Layouts/BackdropLoader";
import MetaData from "../../Layouts/MetaData";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createFaq } from "../../../actions/faqAction";
import { NEW_FAQ_RESET } from "../../../constants/faqConstants";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

const NewFaq = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newFaq);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const newFaqSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("title", title);
        formData.set("description", description);
       
        dispatch(createFaq(formData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("FAQ Created successfully", { variant: "success" });
            dispatch({ type: NEW_FAQ_RESET });
            navigate("/admin/faqs");
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return(
        <>
            <MetaData title="Admin: New FAQ | Fresh Organic Grocery" />

            {loading && <BackdropLoader />}

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

export default NewFaq