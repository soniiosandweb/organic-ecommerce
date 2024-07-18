import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component";
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLatestBlogs } from "../../../actions/blogAction";
import { formatDate } from "../../../utils/functions";

const Blog = () => {

    const dispatch = useDispatch();
    const {latestBlogs, loading} = useSelector((state) => state.latestBlog);

    useEffect(() => {
        dispatch(getLatestBlogs());
    }, [dispatch])

    return(
        <section className="bg-white w-full overflow-hidden blog-section relative">
            <div className="py-8 lg:py-16 sm:w-11/12 m-auto px-4 w-full flex flex-col">
                
                <div className="flex py-2 justify-between items-center flex-col sm:flex-row">
                    <div className="title flex flex-col gap-0.5 items-center sm:items-start mb-5 sm:mb-0">
                        <h2 className="text-3xl font-semibold text-center">
                            <span className='text-primary-green'>~ </span> Our Blog <span className='text-primary-green'>~ </span>
                        </h2>
                    </div>
                    <Link to="/blogs" className="bg-primary-green text-md font-medium text-white px-5 py-2.5 rounded-sm shadow-lg capitalize hover:bg-black">view all</Link>
                </div>

                <div className="py-10 gap-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full place-content-start">

                    {!loading && latestBlogs && (
                        latestBlogs.map((blog, index) => (
                            <div className="gap-2 p-4 relative w-full h-full border shadow-lg flex flex-col blog-home" key={index}>
                                <Link to={`/blog/${blog._id}/`} className="flex flex-col items-center text-center group w-full">
                                    <div className="w-full h-48 bg-white overflow-hidden">
                                        <LazyLoadImage 
                                            src={blog.image.url}
                                            alt="blog1"
                                            className="w-full h-full object-cover blog-img"
                                        />
                                    </div>
                                </Link>
                                <div className="flex flex-col gap-2 mt-4 items-left">
                                    <p className="text-sm text-primary-green font-medium items-left">{formatDate(blog.createdAt)}</p>
                                    <Link to={`/blog/${blog._id}/`} className="flex flex-col items-left text-left group w-full">
                                        <h2 className="text-xl font-medium blog-title">{blog.name.length > 50 ? `${blog.name.substring(0, 50)}...` : blog.name}</h2>
                                    </Link>
                                    <p className="text-sm">{blog.except}</p>
                                </div>
                            </div>
                        ))
                    )}

                </div>
            </div>
        </section>
    )
}

export default Blog