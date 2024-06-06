import Product from './Product';
import Slider from 'react-slick';
import { NextBtn, PreviousBtn } from '../Banner/Banner';
import { getRandomProducts } from '../../../utils/functions';
import { useSelector } from 'react-redux';

const DealSlider = ({ title }) => {

    const { loading, products } = useSelector((state) => state.products);

    var settings = {
        autoplay: false,
        autoplaySpeed: 5000,
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
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
        <section className="bg-white w-full overflow-hidden py-16">
            {/* <!-- header --> */}
            <div className="flex px-6 pb-10 justify-center items-center">
                <h2 className="text-3xl font-semibold">{title}</h2>
            </div>
            {/* <!-- header --> */}
            {loading ? null :
                <Slider {...settings} >
                    {products && getRandomProducts(products, 9).map((item, i) => (
                        <Product {...item} key={i} />
                    ))}
                </Slider>
            }
        </section>
    );
};

export default DealSlider;
