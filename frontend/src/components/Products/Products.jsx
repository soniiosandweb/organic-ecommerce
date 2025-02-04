import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProducts } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import Product from './Product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import MetaData from '../Layouts/MetaData';
import { useLocation } from 'react-router-dom';
import noResult from '../../assets/images/no-search-results.webp';
import { getAllCategories } from '../../actions/categoryAction';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TextField } from '@mui/material';

const Products = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();

    const [price, setPrice] = useState([0, 20000]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(20000);
    const [category, setCategory] = useState(location.search ? location.search.split("=")[1] : "");
    const [ratings, setRatings] = useState(0);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    // filter toggles
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [ratingsToggle, setRatingsToggle] = useState(true);

    const { products, loading, error, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

    const { categories, loading: categoriesLoading } = useSelector((state) => state.allCategories);

    const keyword = params.keyword;

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
        setMinPrice(newPrice[0]);
        setMaxPrice(newPrice[1]);
    }

    const handlePriceChange = (min, max) => {
        let minValue = parseInt(min);
        if(isNaN(minValue)){
            minValue = 0;
        } 

        let maxValue = parseInt(max);
        if(isNaN(maxValue)){
            maxValue = 20000;
        } 
        setPrice([minValue, maxValue]);
        setMinPrice(minValue);
        setMaxPrice(maxValue);
    }

    const clearFilters = () => {
        setPrice([0, 20000]);
        setMinPrice(0);
        setMaxPrice(20000);
        setCategory("");
        setRatings(0);
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if(categoriesLoading === undefined){
            dispatch(getAllCategories());
        }
        dispatch(getProducts(keyword, category, price, ratings, currentPage));
        
    }, [dispatch, keyword, category, price, ratings, currentPage, error, enqueueSnackbar, categoriesLoading]);

    return (
        <>
            <MetaData title="All Products | Fresh Organic Grocery" />

            <main className="w-full py-16 px-4">
                <div className="sm:w-11/12 m-auto w-full">
                    {/* <!-- row --> */}
                    <div className="flex flex-col lg:flex-row gap-5">

                        {/* <!-- sidebar column  --> */}
                        <div className="flex flex-col w-full lg:w-1/4 px-1">

                            {/* <!-- nav tiles --> */}
                            <div className="flex flex-col bg-white border border-gray-300">

                                {/* <!-- filters header --> */}
                                <div className="flex items-center justify-between gap-5 px-4 py-2 border-b border-gray-300 flex-col sm:flex-row lg:flex-col xl:flex-row">
                                    <p className="text-md font-bold uppercase">Filters</p>
                                    <span className="capitalize bg-primary-green text-white text-md cursor-pointer font-semibold px-5 py-2.5 rounded-sm shadow-lg hover:bg-black" onClick={() => clearFilters()}>clear all</span>
                                </div>

                                <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">

                                    {/* price slider filter */}
                                    <div className="flex flex-col gap-2 border-b border-gray-300 px-4">
                                        <span className="text-lg font-semibold">Price</span>

                                        <Slider
                                            value={price}
                                            onChange={priceHandler}
                                            valueLabelDisplay="auto"
                                            getAriaLabel={() => 'Price range slider'}
                                            min={0}
                                            max={20000}
                                            color='primary'
                                            className='price-slider'
                                        />

                                        <div className="flex gap-3 items-center justify-between mb-2 min-w-full flex-col sm:flex-row lg:flex-col xl:flex-row">
                                            <TextField
                                                placeholder="Min Price"
                                                type="number"
                                                variant="outlined"
                                                size="small"
                                                InputProps={{
                                                    inputProps: {
                                                        min: 0,
                                                        max: 20000
                                                    },
                                                    inputMode: 'numeric'
                                                }}
                                                value={minPrice}
                                                onChange={(e) => handlePriceChange(e.target.value, maxPrice)}
                                                className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50"
                                            />
                                            <span className="font-medium text-gray-400">to</span>
                                            <TextField
                                                placeholder="Min Price"
                                                type="number"
                                                variant="outlined"
                                                size="small"
                                                InputProps={{
                                                    inputProps: {
                                                        min: 0,
                                                        max: 20000
                                                    }
                                                }}
                                                value={maxPrice}
                                                onChange={(e) => handlePriceChange(minPrice, e.target.value)}
                                                className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                    {/* price slider filter */}

                                    {/* category filter */}
                                    <div className="flex flex-col border-b border-gray-300 px-4">

                                        <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setCategoryToggle(!categoryToggle)}>
                                            <p className="text-lg font-semibold">Category</p>
                                            {categoryToggle ?
                                                <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                                <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                            }
                                        </div>

                                        {categoryToggle && (
                                            <div className="flex flex-col pb-1">
                                                <FormControl>
                                                    <RadioGroup
                                                        aria-labelledby="category-radio-buttons-group"
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        name="category-radio-buttons"
                                                        value={category}
                                                    >
                                                        {categories && categories.map((el, i) => (
                                                            <FormControlLabel  key={i} value={el._id} control={<Radio size="small" />} label={<span className="text-sm">{el.name}</span>} />
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        )}

                                    </div>
                                    {/* category filter */}

                                    {/* ratings filter */}
                                    <div className="flex flex-col px-4">

                                        <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setRatingsToggle(!ratingsToggle)}>
                                            <p className="text-lg font-semibold">Ratings</p>
                                            {ratingsToggle ?
                                                <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                                <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                            }
                                        </div>

                                        {ratingsToggle && (
                                            <div className="flex flex-col pb-1">
                                                <FormControl>
                                                    <RadioGroup
                                                        aria-labelledby="ratings-radio-buttons-group"
                                                        onChange={(e) => setRatings(e.target.value)}
                                                        value={ratings}
                                                        name="ratings-radio-buttons"
                                                    >
                                                        {[4, 3, 2, 1].map((el, i) => (
                                                            <FormControlLabel value={el} key={i} control={<Radio size="small" />} label={<span className="flex items-center text-sm">{el}<StarIcon sx={{ fontSize: "12px", mr: 0.5 }} /> & above</span>} />
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        )}

                                    </div>
                                    {/* ratings filter */}

                                </div>

                            </div>
                            {/* <!-- nav tiles --> */}

                        </div>
                        {/* <!-- sidebar column  --> */}

                        {/* <!-- search column --> */}
                        <div className="flex-1">

                            {!loading && products?.length === 0 && (
                                <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
                                   
                                    <LazyLoadImage 
                                    className="w-1/2 h-44 object-contain" src={noResult} alt="Search Not Found"
                                    />
                                    <h1 className="text-2xl font-medium text-gray-900">Sorry, no results found!</h1>
                                    <p className="text-xl text-center text-primary-grey">Please check the spelling or try searching for something else</p>
                                </div>
                            )}

                            {loading ? <Loader /> : (
                                <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 w-full place-content-start overflow-hidden gap-5 pb-4">
                                        {products?.map((product) => (
                                                <Product {...product} key={product._id} />
                                            ))
                                        }
                                    </div>
                                    {filteredProductsCount > resultPerPage && (
                                        <Pagination
                                            count={Number(((filteredProductsCount + 6) / resultPerPage).toFixed())}
                                            page={currentPage}
                                            onChange={(e, val) => setCurrentPage(val)}
                                            color="primary"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                        {/* <!-- search column --> */}
                    </div >
                    {/* <!-- row --> */}
                </div>
            </main >
        </>
    );
};

export default Products;
