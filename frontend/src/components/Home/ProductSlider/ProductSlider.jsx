import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getRandomProducts } from '../../../utils/functions';
import { settings } from '../DealSlider/DealSlider';
import Product from './Product';
import trendingImg from '../../../assets/images/ProductSlider/trending.jpg';
import './Product.css';

const ProductSlider = ({ title, tagline }) => {

    const { loading, products } = useSelector((state) => state.products);

    return (
        <section className="bg-white w-full overflow-hidden">
            <div className="py-16 sm:w-11/12 m-auto px-4 w-full flex flex-col">
                {/* <!-- header --> */}
                <div className="flex py-2 justify-between items-center flex-col sm:flex-row">
                    <div className="title flex flex-col gap-0.5 items-center sm:items-start mb-5 sm:mb-0">
                        <p className="text-md text-primary-green font-semibold uppercase">~ {tagline} ~</p>
                        <h2 className="text-3xl font-semibold">{title}</h2>
                    </div>
                    <Link to="/products" className="bg-primary-green text-md font-medium text-white px-5 py-2.5 rounded-full shadow-lg capitalize hover:bg-black">view all</Link>
                </div>

                <div className="flex py-10 justify-between ">

                    <div className='hidden md:block w-1/4 flex-1'>
                        <div className='trending-banner h-full w-full relative'>
                            <div className='trending-text h-full w-full flex items-center flex-col z-10 relative p-5 lg:p-10'>
                                <h3 className='text-3xl font-semibold text-center mt-0 lg:mt-10 mb-5'>Deal Of The Day 25% off</h3>
                                <Link to="/products" className="bg-primary-green text-md font-medium text-white px-5 py-2.5 rounded-full shadow-lg capitalize hover:bg-black">Shop now</Link>
                            </div>
                            <img draggable="false" className="w-full object-cover object-center absolute top-0 h-full rounded-md" src={trendingImg} alt="trending banner" />
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
    );
};

export default ProductSlider;
