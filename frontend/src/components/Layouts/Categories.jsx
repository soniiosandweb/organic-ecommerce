import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../actions/categoryAction';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NextBtn, PreviousBtn } from '../Home/Banner/Banner';
import Slider from 'react-slick';

const Categories = () => {

    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.allCategories);

    var settings = {
        autoplay: true,
        autoplaySpeed: 8000,
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipe: true,
        pauseOnHover: true,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
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
    }

    useEffect(()=>{
        dispatch(getAllCategories());
    },[dispatch]);

    return (
        <section className="block bg-white min-w-full py-8 lg:py-16 overflow-hidden" id="product_categories">

            <div className="w-full sm:w-11/12 px-4 m-auto flex items-center justify-center flex-wrap gap-4">

            <Slider {...settings} className="flex justify-between w-full testimonial-slider px-5 sm:px-10">
                {categories && categories.map((item, i) => (
                    <Link to={`/products?category=${item._id}`} className="flex-1 flex-col gap-1 items-center p-2 group w-1/3 md:w-1/5 text-center product-category-home" key={i}>
                        <div className="h-28 w-28 md:h-32 md:w-32 xl:h-40 xl:w-40 m-auto">
                            <LazyLoadImage 
                                className="h-full w-full rounded-full object-cover border-4 border-gray" src={item.image.url} alt={item.name}
                            />
                        </div>
                        <p className="text-xl text-black mt-5 font-medium group-hover:text-primary-green text-center">{item.name}</p>
                    </Link>
                ))}
            </Slider>

            </div>
        </section>
    );
};

export default Categories;
