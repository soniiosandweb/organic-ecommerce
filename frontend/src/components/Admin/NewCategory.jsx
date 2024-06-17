import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { NEW_CATEGORY_RESET } from '../../constants/categoryConstants';
import { createCategory, clearErrors } from '../../actions/categoryAction';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const NewCategory = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newCategory);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [categoryPreview, setCategoryPreview] = useState("");

    const newCategorySubmitHandler = (e) => {
        e.preventDefault();

        if (!category) {
            enqueueSnackbar("Add Category Image", { variant: "warning" });
            return;
        }

        const formData = new FormData();

        formData.set("name", name);
        formData.set("category", category);
       
        dispatch(createCategory(formData));
    }

    const handleCategoryChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setCategoryPreview(reader.result);
                setCategory(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Category Created successfully", { variant: "success" });
            dispatch({ type: NEW_CATEGORY_RESET });
            navigate("/admin/categories");
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Category | Organic" />

            {loading && <BackdropLoader />}

            <Link to="/admin/categories" className="ml-1 flex w-max items-center gap-0 font-semibold text-primary-green uppercase hover:text-black"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>

            <form onSubmit={newCategorySubmitHandler} encType="multipart/form-data" className="flex flex-col bg-white border border-gray-300 gap-5 shadow p-3 lg:p-5" id="categoryform">

                <div className="flex flex-col gap-3 w-full lg:w-2/3">
                    <TextField
                        label="Category Name"
                        variant="outlined"
                        size="medium"
                        required
                        value={name}
                        name='category_name'
                        onChange={(e) => setName(e.target.value)}
                    />
                    
                </div>

                <div className="flex flex-col gap-2 w-full lg:w-2/3">
                
                    <h2 className="font-medium">Category Image</h2>
                    <div className="w-full flex gap-2 justify-center items-center overflow-x-auto h-32 border border-gray-300 rounded">
                        {!categoryPreview ? <ImageIcon /> :
                            <img draggable="false" src={categoryPreview} alt="Brand Logo" className="w-full h-full object-contain" />
                        }
                    </div>
                    <label className="w-full rounded bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
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

                <div className="flex flex-col gap-2 w-full lg:w-1/3">
                    <input form="categoryform" type="submit" className="bg-primary-green uppercase p-3 text-white font-medium rounded-full shadow hover:bg-black cursor-pointer" value="Submit" />
                </div>

            </form>
        </>
    );
};

export default NewCategory;
