import { Link } from "react-router-dom"
import banner1 from '../../../assets/images/Categories/banner-1.webp';
import banner2 from '../../../assets/images/Categories/banner-2.webp';
import banner3 from '../../../assets/images/Categories/banner-3.webp';
import { LazyLoadImage } from "react-lazy-load-image-component";
import './style.css';

const Blog = () => {
    return(
        <section className="bg-white w-full overflow-hidden blog-section relative">
            <div className="py-8 lg:py-16 sm:w-11/12 m-auto px-4 w-full flex flex-col">
                
                <div className="flex py-2 justify-between items-center flex-col sm:flex-row">
                    <div className="title flex flex-col gap-0.5 items-center sm:items-start mb-5 sm:mb-0">
                        <h2 className="text-3xl font-semibold text-center">
                            <span className='text-primary-green'>~ </span> Our Blog <span className='text-primary-green'>~ </span>
                        </h2>
                    </div>
                    <Link to="/products" className="bg-primary-green text-md font-medium text-white px-5 py-2.5 rounded-sm shadow-lg capitalize hover:bg-black">view all</Link>
                </div>

                <div className="py-10 gap-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full place-content-start">
                   
                    <div className="gap-2 p-4 relative w-full h-full border shadow-lg flex flex-col blog-home">
                        <Link to={`/products`} className="flex flex-col items-center text-center group w-full">
                            <div className="w-full max-h-60 xl:max-h-96 h-full bg-white overflow-hidden">
                                <LazyLoadImage 
                                    src={banner1}
                                    alt="blog1"
                                    className="w-full h-full object-cover blog-img"
                                />
                            </div>
                        </Link>
                        <div className="flex flex-col gap-2 mt-4">
                            <p className="text-md text-primary-green font-medium">February 21, 2024</p>
                            <Link to={`/products`} className="flex flex-col items-left text-left group w-full">
                                <h2 className="text-xl font-semibold blog-title">Made Confident Bigger Chance As</h2>
                            </Link>
                            <p className="text-md">Our goal has always been to motivate, encourage and release our fellow creatives to do their thing Sed a libero. Mauris...</p>
                        </div>
                    </div>
                   
                    <div className="gap-2 p-4 relative w-full h-full border shadow-lg flex flex-col blog-home">
                        <Link to={`/products`} className="flex flex-col items-center text-center group w-full">
                            <div className="w-full max-h-60 xl:max-h-96 h-full bg-white overflow-hidden">
                                <LazyLoadImage 
                                    src={banner2}
                                    alt="blog2"
                                    className="w-full h-full object-cover blog-img"
                                />
                            </div>
                        </Link>
                        <div className="flex flex-col gap-2 mt-4">
                            <p className="text-md text-primary-green font-medium">February 21, 2024</p>
                            <Link to={`/products`} className="flex flex-col items-left text-left group w-full">
                                <h2 className="text-xl font-semibold blog-title">Spicy Choose Plush Amazing Proven</h2>
                            </Link>
                            <p className="text-md">Our goal has always been to motivate, encourage and release our fellow creatives to do their thing Sed a libero. Mauris...</p>
                        </div>
                    </div>
                    
                    <div className="gap-2 p-4 relative w-full h-full border shadow-lg flex flex-col blog-home">
                        <Link to={`/products`} className="flex flex-col items-center text-center group w-full">
                            <div className="w-full max-h-60 xl:max-h-96 h-full bg-white overflow-hidden">
                                <LazyLoadImage 
                                    src={banner3}
                                    alt="blog3"
                                    className="w-full h-full object-cover blog-img"
                                />
                            </div>
                        </Link>
                        <div className="flex flex-col gap-2 mt-4">
                            <p className="text-md text-primary-green font-medium">February 21, 2024</p>
                            <Link to={`/products`} className="flex flex-col items-left text-left group w-full">
                                <h2 className="text-xl font-semibold blog-title">Feedback Creamy Thought Chance</h2>
                            </Link>
                            <p className="text-md">Our goal has always been to motivate, encourage and release our fellow creatives to do their thing Sed a libero. Mauris...</p>
                        </div>
                    </div>
                  
                    <div className="gap-2 p-4 relative w-full h-full border shadow-lg flex flex-col blog-home">
                        <Link to={`/products`} className="flex flex-col items-center text-center group w-full">
                            <div className="w-full max-h-60 xl:max-h-96 h-full bg-white overflow-hidden">
                                <LazyLoadImage 
                                    src={banner3}
                                    alt="blog3"
                                    className="w-full h-full object-cover blog-img"
                                />
                            </div>
                        </Link>
                        <div className="flex flex-col gap-2 mt-4">
                            <p className="text-md text-primary-green font-medium">February 21, 2024</p>
                            <Link to={`/products`} className="flex flex-col items-left text-left group w-full">
                                <h2 className="text-xl font-semibold blog-title">The Fashion Breakfast</h2>
                            </Link>
                            <p className="text-md">Our goal has always been to motivate, encourage and release our fellow creatives to do their thing Sed a libero. Mauris...</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Blog