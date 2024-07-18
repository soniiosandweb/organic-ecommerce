import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { clearErrors, getBlogs, getLatestBlogs } from "../../actions/blogAction";
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
import { formatDate } from "../../utils/functions";

const Blogs = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();

    const [category, setCategory] = useState(location.search ? location.search.split("=")[1] : "");

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    // filter toggles
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [postToggle, setPostToggle] = useState(true);

    const { blogs, loading, error, resultPerPage, filteredBlogsCount } = useSelector((state) => state.blogs);

    const {latestBlogs, loading:latestLoading} = useSelector((state) => state.latestBlog);

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

        if(latestLoading === undefined){ 
            dispatch(getLatestBlogs());
        }

    }, [dispatch, keyword, category, latestLoading, currentPage, error, enqueueSnackbar]);

    return (
        <>
            <MetaData title="All Blogs | Fresh Organic Grocery" />

            <main className="w-full py-16 px-4">
                <div className="sm:w-11/12 m-auto w-full">
                    {/* <!-- row --> */}
                    <div className="flex flex-col lg:flex-row gap-5">

                        {/* <!-- sidebar column  --> */}
                        <div className="flex flex-col w-full lg:w-1/4 px-1 gap-6">

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
                                                            <FormControlLabel  key={i} value={el.id} control={<Radio size="small" />} label={<span className="text-sm">{el.name}</span>} />
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

                            {/* pupular posts */}
                            <div className="flex flex-col border border-gray-300 px-4">

                                <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setPostToggle(!postToggle)}>
                                    <p className="text-lg font-semibold">Popular Post</p>
                                    {postToggle ?
                                        <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                        <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                    }
                                </div>

                                {postToggle && (
                                    <div className="flex flex-col gap-6 pb-3">
                                        {!latestLoading && latestBlogs && (
                                            latestBlogs.map((blog, index) => (
                                                <div className="flex flex-row gap-4" key={index}>
                                                <Link to={`/blog/${blog._id}/`} className="flex flex-row items-start text-center group w-full gap-4">
                                                        <div className="w-16 h-12 bg-[#f4f4f4]">
                                                            <LazyLoadImage 
                                                            className="w-full h-full object-cover" src={blog.image.url} alt={blog.name}
                                                            />
                                                        </div>
                                                        <div className='w-full sm:w-5/6 flex flex-col gap-1 items-start'>
                                                            <h2 className="text-sm sm:text-md font-semibold text-left group-hover:text-primary-green">{blog.name.length > 50 ? `${blog.name.substring(0, 50)}...` : blog.name}</h2>

                                                            <p className="text-sm text-gray-500 items-left">{formatDate(blog.createdAt)}</p>
                                                        </div>
                                                    
                                                    </Link>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                            </div>
                            {/* popular posts */}


                        </div>
                        {/* <!-- sidebar column  --> */}
                       
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
                     
                    </div >
                    {/* <!-- row --> */}
                </div>
            </main >
        </>
    )
}

export default Blogs