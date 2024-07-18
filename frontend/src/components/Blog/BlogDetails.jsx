import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getBlogDetails, getLatestBlogs } from "../../actions/blogAction";
import { useSnackbar } from "notistack";
import { Link, useParams } from "react-router-dom";
import MetaData from "../Layouts/MetaData";
import Loader from "../Layouts/Loader";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { formatDate, getCategory } from "../../utils/functions";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {categories} from '../../utils/constants';

const BlogDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { blog, loading, error } = useSelector((state) => state.blogDetails);
    const {latestBlogs, loading:latestLoading} = useSelector((state) => state.latestBlog);

    const [postToggle, setPostToggle] = useState(true);
    const [categoryToggle, setCategoryToggle] = useState(true);

    const blogId = params.id;

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
      
        dispatch(getBlogDetails(blogId));
        dispatch(getLatestBlogs());
    }, [dispatch, blogId, error, enqueueSnackbar]);

    return (
        loading ? <Loader /> : (
            <>
                <MetaData title={`${blog.name} | Fresh Organic Grocery `} />

                <section className={`bg-gray-100 w-full overflow-hidden blog-details-banner relative min-h-96  z-10`}>
                    <div className="py-16 sm:w-11/12 m-auto px-4 w-full flex flex-col items-center relative justify-center h-full">
                        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center w-full lg:w-9/12`}>{blog.name}</h1>
                        <p className={`flex gap-5 text-medium text-white items-center py-4`}>
                            <span className="flex gap-1 items-center capitalize">
                                <PersonOutlineOutlinedIcon />
                                {blog.user && (blog.user.name)}</span>
                            <span className="flex gap-1 items-center">
                                <DateRangeOutlinedIcon />
                                {formatDate(blog.createdAt)}
                            </span>
                            
                        </p>
                    </div>

                    {blog.image && (
                         <LazyLoadImage 
                            className="w-full object-cover object-center absolute top-0 h-full blog-banner-img" src={blog.image.url} alt="banner"
                        />
                    )}
                </section>

                <main className="w-full sm:mt-0">
                    <div className="py-16 sm:w-11/12 m-auto px-4 w-full relative z-10">
                        <div className="flex flex-col lg:flex-row gap-5">
                            {/* <!-- sidebar column  --> */}
                            <div className="flex flex-col w-full lg:w-1/4 px-1">

                            {/* <!-- nav tiles --> */}
                            <div className="flex flex-col bg-white ">

                                <div className="flex flex-col gap-6 text-sm overflow-hidden">

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

                                    {/* category filter */}
                                    <div className="flex flex-col border border-gray-300 px-4">

                                        <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setCategoryToggle(!categoryToggle)}>
                                            <p className="text-lg font-semibold">Category</p>
                                            {categoryToggle ?
                                                <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                                <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                            }
                                        </div>

                                        {categoryToggle && (
                                            <div className="flex flex-col gap-2 pb-3">
                                                
                                                {categories && categories.map((el, i) => (
                                                    <Link to={`/blogs?category=${el.id}`} key={i} className="hover:text-primary-green">
                                                        <p className="text-sm">{el.name}</p>
                                                    </Link>
                                                ))}
                                                    
                                            </div>
                                        )}

                                    </div>
                                    {/* category filter */}

                                </div>

                            </div>
                            {/* <!-- nav tiles --> */}

                            </div>
                            {/* <!-- sidebar column  --> */}

                            <div className="flex-1">
                                <div dangerouslySetInnerHTML={{__html:blog.description}} className='text-sm overflow-x-hidden'></div>

                                {/* <!-- categories details --> */}
                                <div className="flex gap-4 md:gap-10 mt-8 items-stretch text-md">
                                    <p className="text-black font-semibold">Category:</p>

                                    <ul className="flex flex-row gap-2">
                                        <li>
                                            <span className="text-black text-sm font-medium border border-gray-300 rounded-full px-6 py-2">{blog.category && (getCategory(blog.category))}</span>
                                        </li>
                                    </ul>
                                </div>
                                {/* <!-- categories details --> */}

                                {/* <!-- tags details --> */}
                                <div className="flex gap-4 md:gap-10 mt-8 items-stretch text-md">
                                    <p className="text-black font-semibold">Tags:</p>

                                    <ul className="flex flex-row gap-2">
                                        {blog.tags && blog.tags?.map((tag, i) => (
                                            <li key={i}>
                                                <span className="text-black text-sm font-medium border border-gray-300 rounded-full px-6 py-2">{tag}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* <!-- tags details --> */}
                            </div>
                        </div>
                        
                    </div>
                </main>

            </>
        )
    )
}

export default BlogDetails