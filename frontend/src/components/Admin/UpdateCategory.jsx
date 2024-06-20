import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clearErrors, getCategoryDetails, updateCategory } from "../../actions/categoryAction";
import { REMOVE_CATEGORY_DETAILS, UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import { LazyLoadImage } from "react-lazy-load-image-component";

const UpdateCategory = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const categoryId = params.id;

    const { loading, category, error } = useSelector((state) => state.categoryDetails);
    const { loading: updateLoading, isUpdated, error: updateError } = useSelector((state) => state.category);

    const [name, setName] = useState("");
    const [categoryImg, setCategoryImg] = useState("");
    const [categoryPreview, setCategoryPreview] = useState("");
    const [oldImage, setOldImage] = useState("");

    const handleCategoryChange = (e) => {
        const reader = new FileReader();

        setCategoryImg("")
        setCategoryPreview("")
        setOldImage("")

        reader.onload = () => {
            if (reader.readyState === 2) {
                setCategoryPreview(reader.result);
                setCategoryImg(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    const updateCategorySubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("category", categoryImg);

        dispatch(updateCategory(params.id, formData));
    }

    useEffect(() => {

        console.log(category)
       
        if (category && category._id !== categoryId) {
            dispatch(getCategoryDetails(categoryId));
        } else {
            setName(category.name);
            setOldImage(category.image)
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
            enqueueSnackbar("Category Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_CATEGORY_RESET });
            dispatch({ type: REMOVE_CATEGORY_DETAILS});
            navigate('/admin/categories');
        }
    }, [dispatch, error, updateError, isUpdated, categoryId, category, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Category | Organic" />

            {loading && <BackdropLoader />}
            {updateLoading && <BackdropLoader />}

            <Link to="/admin/categories" className="ml-1 flex items-center gap-0 font-semibold text-primary-green uppercase hover:text-black"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>

            <form onSubmit={updateCategorySubmitHandler} encType="multipart/form-data" className="flex flex-col bg-white border border-gray-300 gap-5 shadow p-3 lg:p-5" id="categoryform">

                <div className="flex flex-col gap-3 w-full lg:w-2/3">
                    <TextField
                        label="Category Name"
                        variant="outlined"
                        size="small"
                        required
                        value={name}
                        name='category_name'
                        onChange={(e) => setName(e.target.value)}
                    />
                    
                </div>

                <div className="flex flex-col gap-2 w-full lg:w-2/3 xl:w-1/3">
                
                    <h2 className="font-medium">Category Image</h2>
                    <div className="w-full flex gap-2 justify-center items-center overflow-x-auto h-32 border rounded">
                        {oldImage && (
                            <LazyLoadImage 
                                src={oldImage.url}
                                alt="Product Category"
                                className="w-full h-full object-contain"
                            />
                        )}
                        
                        {!categoryPreview ? null :
                            <LazyLoadImage 
                                src={categoryPreview}
                                alt="Product Category"
                                className="w-full h-full object-contain"
                            />
                        }
                    </div>
                    <label className="w-full rounded-sm bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                        <input
                            type="file"
                            name="category"
                            accept="image/*"
                            onChange={handleCategoryChange}
                            className="hidden"
                        />
                        Choose Category Image
                    </label>

                </div>

                <div className="flex flex-col gap-2 w-full sm:w-1/3">
                    <input form="categoryform" type="submit" className="bg-primary-green uppercase p-3 text-white font-medium rounded-sm shadow hover:bg-black cursor-pointer" value="Update" />
                </div>

            </form>
        </>
    );

}

export default UpdateCategory;