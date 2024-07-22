import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { createBlog, clearErrors } from '../../../actions/blogAction';
import { NEW_BLOG_RESET } from '../../../constants/blogConstants';
import { categories } from '../../../utils/constants';
import Editor from 'react-simple-wysiwyg';

const NewBlog = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newBlog);

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    const [name, setName] = useState("");
    const [except, setExcept] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const addHighlight = () => {
        if (!tagInput.trim()) return;
        setTags([...tags, tagInput]);
        setTagInput("");
    }

    const deleteHighlight = (index) => {
        setTags(tags.filter((h, i) => i !== index))
    }

    const handleBlogImageChange = (e) => {

        let file = e.target.files[0];

        if (file.size > 1e6) {
            enqueueSnackbar("Please upload a file smaller than 1 MB", { variant: "warning" });
            return;
        }
        
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result);
                setImage(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    const newBlogSubmitHandler = (e) => {
        e.preventDefault();

        if (!image) {
            enqueueSnackbar("Add Blog Image", { variant: "warning" });
            return;
        }

        if (description.length <= 0) {
            enqueueSnackbar("Add Blog Content", { variant: "warning" });
            return;
        }

        const formData = new FormData();

        formData.set("name", name);
        formData.set("description", description);
        formData.set("category", category);
        formData.set("image", image);
        formData.set("except", except);

        tags.forEach((h) => {
            formData.append("tags", h);
        });

        dispatch(createBlog(formData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Blog Created", { variant: "success" });
            dispatch({ type: NEW_BLOG_RESET });
            navigate("/admin/blogs");
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Blog | Fresh Organic Grocery" />

            {loading && <BackdropLoader />}

            <Link to="/admin/blogs" className="ml-1 w-max flex items-center gap-0 font-semibold text-primary-green uppercase hover:text-black"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>

            <form onSubmit={newBlogSubmitHandler} encType="multipart/form-data" className="flex flex-col bg-white rounded-sm border border-gray-300 shadow gap-5 p-3 lg:p-5" id="mainform">
                    
                <div className="flex flex-col gap-3 w-full xl:w-2/3">
                    <TextField
                        label="Title"
                        variant="outlined"
                        size="medium"
                        required
                        value={name}
                        name='blog_title'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-3 w-full xl:w-2/3">
                    <TextField
                        label="Blog Except"
                        variant="outlined"
                        size="medium"
                        required
                        value={except}
                        name='blog_except'
                        inputProps={{
                            maxLength: 100,
                        }}
                        onChange={(e) => setExcept(e.target.value)}
                    />
                </div>
                    
                <div className="flex flex-col gap-3 w-full xl:w-2/3">
                    <h2 className="font-medium">Content</h2>
                    <Editor value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                
                <div className="flex justify-between gap-4 flex-col md:flex-row xl:w-2/3">
                    <TextField
                        label="Category"
                        select
                        fullWidth
                        variant="outlined"
                        size="medium"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="">Select Category</MenuItem>
                        {categories && categories.map((el, i) => (
                            <MenuItem value={el.id} key={i}>
                                {el.name}
                            </MenuItem>
                        ))}
                    </TextField>
                   
                </div>

                <div className="flex flex-col gap-2 xl:w-2/3">
                    <div className="flex justify-between items-center relative">
                        <TextField
                            label="Tags"
                            variant="outlined"
                            size="medium"
                            value={tagInput}
                            name='highlight'
                            onChange={(e) => setTagInput(e.target.value)}
                            className='flex-1'
                        />
                        <span onClick={() => addHighlight()} className="py-2 px-6 bg-primary-green text-white rounded-r hover:shadow-lg cursor-pointer absolute right-0 h-full flex items-center">Add</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        {tags.map((h, i) => (
                            <div className="flex justify-between rounded items-center py-1 px-2 bg-green-50">
                                <p className="text-green-800 px-2 text-md font-medium">{h}</p>
                                <span onClick={() => deleteHighlight(i)} className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer">
                                    <DeleteIcon />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2 xl:w-2/3">

                    <h2 className="font-medium">Featured Image</h2>
                    <div className="w-full flex gap-2 justify-center items-center overflow-x-auto h-32 border border-gray-300 rounded">
                        {!imagePreview ? <ImageIcon /> :
                            <LazyLoadImage 
                                src={imagePreview}
                                alt="Featured"
                                className="w-full h-full object-contain"
                            />
                        }
                    </div>
                    <label className="w-full rounded bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg hover:bg-gray-700">
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleBlogImageChange}
                            className="hidden"
                        />
                        Choose Featured Image
                    </label>

                </div>
                
                <div className="flex flex-col gap-2 sm:w-1/3">
                    <input form="mainform" type="submit" className="bg-primary-green uppercase p-3 text-white font-medium rounded-sm shadow hover:bg-black cursor-pointer" value="Submit" />
                </div>

            </form>
        </>
    );
};

export default NewBlog;
