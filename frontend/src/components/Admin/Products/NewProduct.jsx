import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../../constants/productConstants';
import { createProduct, clearErrors } from '../../../actions/productAction';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';
import { getAllCategories } from '../../../actions/categoryAction';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Editor from 'react-simple-wysiwyg';
import { Checkbox, FormControlLabel } from '@mui/material';

const NewProduct = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newProduct);

    const { categories } = useSelector((state) => state.allCategories);

    const [highlights, setHighlights] = useState([]);
    const [highlightInput, setHighlightInput] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [cuttedPrice, setCuttedPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState();
    const [warranty, setWarranty] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [featured, setFeatured] = useState(false);

    const addHighlight = () => {
        if (!highlightInput.trim()) return;
        setHighlights([...highlights, highlightInput]);
        setHighlightInput("");
    }

    const deleteHighlight = (index) => {
        setHighlights(highlights.filter((h, i) => i !== index))
    }

    const handleProductImageChange = (e) => {
        const files = Array.from(e.target.files);

        // setImages([]);
        // setImagesPreview([]);

        files.forEach((file) => {

            if (file.size > 1e6) {
                enqueueSnackbar("Please upload a file smaller than 1 MB", { variant: "warning" });
                return;
            }

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldImages) => [...oldImages, reader.result]);
                    setImages((oldImages) => [...oldImages, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        });
    }

    const deleteImage = (index) => {
        setImagesPreview(images.filter((h, i) => i !== index));
        setImages(images.filter((h, i) => i !== index))
    }

    const newProductSubmitHandler = (e) => {

        e.preventDefault();

        if (description.length <= 0) {
            enqueueSnackbar("Add Product Description", { variant: "warning" });
            return;
        }

        if (images.length <= 0) {
            enqueueSnackbar("Add Product Images", { variant: "warning" });
            return;
        }

        if(cuttedPrice !== 0){
            if(cuttedPrice < price){
                enqueueSnackbar("Product Price must be greater than selling Price.", { variant: "warning" });
                return;
            }
        }

        const formData = new FormData();

        formData.set("name", name);
        formData.set("description", description);
        formData.set("price", price);
        formData.set("cuttedPrice", cuttedPrice);
        formData.set("category", category);
        formData.set("stock", stock);
        formData.set("warranty", warranty);
        formData.set("featured", featured);
       
        images.forEach((image) => {
            formData.append("images", image);
        });

        highlights.forEach((h) => {
            formData.append("highlights", h);
        });

        dispatch(createProduct(formData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Product Created", { variant: "success" });
            dispatch({ type: NEW_PRODUCT_RESET });
            navigate("/admin/products");
        }

        dispatch(getAllCategories());
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Product | Fresh Organic Grocery" />

            {loading && <BackdropLoader />}

            <Link to="/admin/products" className="ml-1 w-max flex items-center gap-0 font-semibold text-primary-green uppercase hover:text-black"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>

            <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="flex flex-col bg-white rounded-sm border border-gray-300 shadow gap-5 p-3 lg:p-5" id="mainform">
                    
                <div className="flex flex-col gap-3 w-full xl:w-2/3">
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="medium"
                        required
                        value={name}
                        name='product_name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                    
                <div className="flex flex-col gap-3 w-full xl:w-2/3">
                    <h2 className="font-medium">Description</h2>
                    <Editor value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                    
                <div className="flex flex-col md:flex-row gap-3 w-full xl:w-2/3">
                    <TextField
                        label="Selling Price"
                        type="number"
                        variant="outlined"
                        size="medium"
                        name="price"
                        InputProps={{
                            inputProps: {
                                min: 50
                            }
                        }}
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className='flex-1'
                    />
                    <TextField
                        label="Price"
                        type="number"
                        variant="outlined"
                        size="medium"
                        InputProps={{
                            inputProps: {
                                min: 0
                            }
                        }}
                        value={cuttedPrice}
                        onChange={(e) => setCuttedPrice(e.target.value)}
                        className='flex-1'
                    />
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
                            <MenuItem value={el._id} key={i}>
                                {el.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Stock"
                        type="number"
                        variant="outlined"
                        size="medium"
                        InputProps={{
                            inputProps: {
                                min: 0
                            }
                        }}
                        required
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <TextField
                        label="Warranty"
                        type="number"
                        variant="outlined"
                        size="medium"
                        InputProps={{
                            inputProps: {
                                min: 0
                            }
                        }}
                        value={warranty}
                        onChange={(e) => setWarranty(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2 xl:w-2/3">
                    <div className="flex justify-between items-center relative">
                        <TextField
                            label="Highlight"
                            variant="outlined"
                            size="medium"
                            value={highlightInput}
                            name='highlight'
                            onChange={(e) => setHighlightInput(e.target.value)}
                            className='flex-1'
                        />
                        <span onClick={() => addHighlight()} className="py-2 px-6 bg-primary-green text-white rounded-r hover:shadow-lg cursor-pointer absolute right-0 h-full flex items-center">Add</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        {highlights.map((h, i) => (
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

                    <h2 className="font-medium">Product Images</h2>
                    <div className="flex flex-wrap gap-3 justify-center items-center overflow-x-auto h-full min-h-40 border rounded border-gray-300">
                        {!imagesPreview.length ? <ImageIcon /> : 
                        imagesPreview.map((image, i) => (
                            <span className='relative' key={i}>
                                <LazyLoadImage 
                                    src={image}
                                    alt="Product"
                                    key={i} 
                                    className="h-32 w-full object-contain"
                                />
                                <span onClick={() => deleteImage(i)} className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer absolute right-0 top-0">
                                    <CancelIcon />
                                </span>
                            </span>
                        ))}
                    </div>

                    <label className="rounded-sm font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2 hover:bg-gray-700">
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleProductImageChange}
                            className="hidden"
                        />
                        Choose Files
                    </label>

                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-2/3">
                    <div className="flex items-center gap-6" id="radioInput">
                        <FormControlLabel value={featured} onChange={()=> setFeatured(!featured)} control={<Checkbox />} label="Featured Product" />
                    </div>
                </div>
                
                <div className="flex flex-col gap-2 sm:w-1/3">
                    <input form="mainform" type="submit" className="bg-primary-green uppercase p-3 text-white font-medium rounded-sm shadow hover:bg-black cursor-pointer" value="Submit" />
                </div>

            </form>
        </>
    );
};

export default NewProduct;
