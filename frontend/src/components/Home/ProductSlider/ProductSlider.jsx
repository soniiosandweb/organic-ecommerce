import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getRandomProducts } from '../../../utils/functions';
import Product from './Product';
import trendingImg from '../../../assets/images/ProductSlider/trending.webp';
import './Product.css';
import { NextBtn, PreviousBtn } from '../Banner/Banner';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductSlider = ({ title, tagline }) => {

    const { loading, products } = useSelector((state) => state.products);

    var settings = {
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 1,
        swipe: false,
        pauseOnHover: true,
        arrows: false,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
        {loading ? null : 

         products && products.length ? 
            <section className="bg-white w-full overflow-hidden">
                <div className="py-16 sm:w-11/12 m-auto px-4 w-full flex flex-col">
                    {/* <!-- header --> */}
                    <div className="flex py-2 justify-between items-center flex-col sm:flex-row">
                        <div className="title flex flex-col gap-0.5 items-center sm:items-start mb-5 sm:mb-0">
                            <p className="text-md text-primary-green font-semibold uppercase">~ {tagline} ~</p>
                            <h2 className="text-3xl font-semibold">{title}</h2>
                        </div>
                        <Link to="/products" className="bg-primary-green text-md font-medium text-white px-5 py-2.5 rounded-sm shadow-lg capitalize hover:bg-black">view all</Link>
                    </div>

                    <div className="flex py-10 justify-between ">

                        <div className='hidden md:block w-1/4'>
                            <div className='trending-banner h-full w-full relative'>
                                <div className='trending-text h-full w-full flex items-center flex-col z-10 relative p-5 lg:p-10'>
                                    <h3 className='text-3xl font-semibold text-center mt-0 lg:mt-10 mb-5'>Shop From Categories</h3>
                                    <button className="bg-primary-green text-md font-medium text-white px-5 py-2.5 rounded-sm shadow-lg capitalize hover:bg-black" onClick={() => document.getElementById('product_categories')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Shop now</button>
                                </div>
                                
                                <LazyLoadImage 
                                    src={trendingImg}
                                    alt="trending banner"
                                    className="w-full object-cover object-center absolute top-0 h-full rounded-md"
                                />
                            </div>
                        </div>
                        <div className='w-full md:w-3/4 flex-1'>
                            {loading ? null :
                                <Slider {...settings} className="flex justify-between product-slider-home">
                                    {products && getRandomProducts(products, 9).map((product) => (
                                        <Product {...product} key={product._id} />
                                    ))}
                                </Slider>
                            }
                        </div>

                    </div>

                    
                </div>
            </section>

            : null
        }
        </>
        
    );
};

export default ProductSlider;
