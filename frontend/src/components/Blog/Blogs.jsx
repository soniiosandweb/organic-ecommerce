import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getBlogs } from "../../actions/blogAction";
import {categories} from '../../utils/constants';
import Blog from "./Blog";
import { FormControl, FormControlLabel, Pagination, Radio, RadioGroup } from "@mui/material";
import Loader from "../Layouts/Loader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import noResult from '../../assets/images/no-search-results.webp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MetaData from "../Layouts/MetaData";
import { useEffect, useState } from "react";

const Blogs = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const [category, setCategory] = useState("");

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    // filter toggles
    const [categoryToggle, setCategoryToggle] = useState(true);

    const { blogs, loading, error, resultPerPage, filteredBlogsCount } = useSelector((state) => state.blogs);

    const keyword = params.keyword;

    const clearFilters = () => {
        setCategory("");
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getBlogs(keyword, category, currentPage));
        
    }, [dispatch, keyword, category, currentPage, error, enqueueSnackbar]);

    return (
        <>
            <MetaData title="All Blogs | Fresh Organic Grocery" />

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

                                    {/* category filter */}
                                    <div className="flex flex-col px-4">

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
                                                            <FormControlLabel  key={i} value={el} control={<Radio size="small" />} label={<span className="text-sm">{el}</span>} />
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        )}

                                    </div>
                                    {/* category filter */}

                                </div>

                            </div>
                            {/* <!-- nav tiles --> */}

                        </div>
                        {/* <!-- sidebar column  --> */}

                        {/* <!-- search column --> */}
                        <div className="flex-1">

                            {!loading && blogs?.length === 0 && (
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
                                        {blogs?.map((blog) => (
                                                <Blog {...blog} key={blog._id} />
                                            ))
                                        }
                                    </div>
                                    {filteredBlogsCount > resultPerPage && (
                                        <Pagination
                                            count={Number(((filteredBlogsCount + 6) / resultPerPage).toFixed())}
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
    )
}

export default Blogs