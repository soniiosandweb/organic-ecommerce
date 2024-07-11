import Slider from 'react-slick';
import { NextBtn, PreviousBtn } from '../Banner/Banner';
import edison from '../../../assets/images/Testimonials/edison.png';
import annSmith from '../../../assets/images/Testimonials/ann-smith.png';
import olivia from '../../../assets/images/Testimonials/olivia.png';
import './Testimonial.css';
import Rating from '@mui/material/Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Testimonials = () => {

    var settings = {
        autoplay: false,
        autoplaySpeed: 5000,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        pauseOnHover: true,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    }


    const testimonials = [
        {
            name: "Edison",
            content : "I’m impressed by the quality and variety of organic options available at this store. The range of locally sourced organic fruits, vegetables, and pantry essentials is...",
            image : edison,
            rating: 5
        },
        {
            name: "Ann Smith",
            content : "I’m impressed by the quality and variety of organic options available at this store. The range of locally sourced organic fruits, vegetables, and pantry essentials is...",
            image : annSmith,
            rating: 4
        },
        {
            name: "Olivia Davis",
            content : "I’m impressed by the quality and variety of organic options available at this store. The range of locally sourced organic fruits, vegetables, and pantry essentials is...",
            image : olivia,
            rating: 5
        }
    ];


    return (
        <section className="bg-white w-full overflow-hidden testimonials-section relative">
            <div className="py-8 lg:py-16 sm:w-11/12 m-auto px-4 w-full flex flex-col md:flex-row relative z-10">
                
                <Slider {...settings} className="flex justify-between w-full testimonial-slider px-5 sm:px-10">
                    {testimonials.map((el, i) => (
                        <div className='w-full flex flex-col gap-2 text-center p-5' key={i}>
                            <LazyLoadImage 
                                src={el.image} 
                                alt={el.title}
                                className="w-max m-auto object-contain object-center mb-5 rounded-full p-3 border-2 border-dashed border-primary-green"
                            />

                            <Rating name="read-only" value={el.rating} readOnly size="medium" precision={0.5} />
                            
                            <p className='text-md font-medium w-full lg:w-2/4 m-auto'>{el.content}</p>
                            <h4 className='text-xl font-semibold my-5'><span className='text-primary-green'>~</span> {el.name} <span className='text-primary-green'>~</span></h4>
                        </div>
                    ))}
                </Slider>

            </div>
        </section>
    );
}

export default Testimonials;