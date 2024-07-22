import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import banner1 from '../../../assets/images/Banners/banner1.webp';
import banner2 from '../../../assets/images/Banners/banner2.webp';
import banner3 from '../../../assets/images/Banners/banner3.webp';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ChevronLeftIcon fontSize="large"/>
    </div>
  )
}

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ChevronRightIcon fontSize="large" />
    </div>
  )
}

const Banner = () => {

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  const banners = [
    {
      subtitle : "To Be Considered An Organic",
      title: "Nourishing With Organic Fare",
      image : banner1,
    },
    {
      subtitle : "Vitality from the Earth",
      title: "Optimizing Health With Fresh",
      image : banner2,
    },
    {
      subtitle : "Nutritional Wonders",
      title: "Health Perks Of Organic",
      image : banner3,
    }
  ];

  return (
    <>
      <section className="w-full rounded-sm shadow relative overflow-hidden banner-slider">
        <Slider {...settings}>
          {banners.map((el, i) => (
            <div className='w-full h-full relative banner-slider-img' key={i}>
              <div className='flex items-center justify-center p-12 h-full flex-col gap-5 text-center'>
                <p className='text-lg sm:text-xl text-white'>{el.subtitle}</p>
                <h1 className='text-white text-3xl sm:text-4xl lg:text-5xl font-semibold'>{el.title}</h1>
                <Link to="/products" className="bg-primary-green text-md font-medium text-white px-10 py-2.5 rounded-sm shadow-lg capitalize hover:bg-black">view all</Link>
              </div>
              <LazyLoadImage 
                src={el.image}
                alt={el.subtitle}
                className="w-full object-cover object-center absolute top-0 h-full"
                style={{zIndex: "-1"}}
              />
            </div>
          ))}
        </Slider>
      </section>
    </>
  );
};

export default Banner;
