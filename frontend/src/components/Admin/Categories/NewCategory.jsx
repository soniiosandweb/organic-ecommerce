import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import { NEW_CATEGORY_RESET } from '../../../constants/categoryConstants';
import { createCategory, clearErrors } from '../../../actions/categoryAction';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const NewCategory = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newCategory);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [categoryPreview, setCategoryPreview] = useState("");

    const [icon, setIcon] = useState("");
    const [iconPreview, setIconPreview] = useState("");

    const newCategorySubmitHandler = (e) => {
        e.preventDefault();

        if (!category) {
            enqueueSnackbar("Add Category Image", { variant: "warning" });
            return;
        }

        if(!icon){
            enqueueSnackbar("Add Category Icon", { variant: "warning" });
            return;
        }

        const formData = new FormData();

        formData.set("name", name);
        formData.set("category", category);
        formData.set("icon", icon);
       
        dispatch(createCategory(formData));
    }

    const handleCategoryChange = (e) => {

        let file = e.target.files[0];

        if(file){
           if (file.size > 1e6) {
                enqueueSnackbar("Please upload a file smaller than 1 MB", { variant: "warning" });
                return;
            }

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setCategoryPreview(reader.result);
                    setCategory(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]); 
        }
        
    }

    const handleCategoryIconChange = (e) => {

        let file = e.target.files[0];

        if(file){
            if (file.size > 1e6) {
                enqueueSnackbar("Please upload a file smaller than 1 MB", { variant: "warning" });
                return;
            }
            
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setIconPreview(reader.result);
                    setIcon(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }

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
            <MetaData title="Admin: New Category | Fresh Organic Grocery" />

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

                <div className="flex flex-col gap-2 w-full lg:w-2/3 xl:w-1/3">
                
                    <h2 className="font-medium">Category Icon</h2>
                    <label className='w-full group cursor-pointer border border-gray-300 rounded'>
                        <div className="w-full flex gap-2 justify-center items-center overflow-x-auto h-32 ">
                            {!iconPreview ? <ImageIcon /> :
                                <LazyLoadImage 
                                    src={iconPreview}
                                    alt="Category"
                                    className="w-full h-full object-contain"
                                />
                            }
                        </div>
                        <p className="w-full rounded-b border border-gray-400 bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow group-hover:border-gray-700 group-hover:bg-gray-700">
                            <input
                                type="file"
                                name="icon"
                                accept="image/*"
                                onChange={handleCategoryIconChange}
                                className="hidden"
                            />
                            Choose Category Icon
                        </p>
                    </label>

                </div>

                <div className="flex flex-col gap-2 w-full lg:w-2/3 xl:w-1/3">
                
                    <h2 className="font-medium">Category Image</h2>
                    <label className='w-full group cursor-pointer border border-gray-300 rounded hover:shadow-lg'>
                        <div className="w-full flex gap-2 justify-center items-center overflow-x-auto h-32 ">
                            {!categoryPreview ? <ImageIcon /> :
                                <LazyLoadImage 
                                    src={categoryPreview}
                                    alt="Category"
                                    className="w-full h-full object-contain"
                                />
                            }
                        </div>
                        <p className="w-full rounded-b border border-gray-400 bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow group-hover:border-gray-700 group-hover:bg-gray-700">
                            <input
                                type="file"
                                name="category"
                                accept="image/*"
                                onChange={handleCategoryChange}
                                className="hidden"
                            />
                            Choose Category Image
                        </p>
                    </label>

                </div>

                <div className="flex flex-col gap-2 w-full sm:w-1/3">
                    <input form="categoryform" type="submit" className="bg-primary-green uppercase p-3 text-white font-medium rounded-sm shadow hover:bg-black cursor-pointer" value="Submit" />
                </div>

            </form>
        </>
    );
};

export default NewCategory;
