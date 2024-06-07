import PageBanner from "../Layouts/PageBanner";
import aboutImg from "../../assets/images/About/about-img.png";
import aboutImg2 from "../../assets/images/About/about-img2.jpg";
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import brand1 from '../../assets/images/About/brand-1.png';
import brand2 from '../../assets/images/About/brand-2.png';
import brand3 from '../../assets/images/About/brand-3.png';
import brand4 from '../../assets/images/About/brand-4.png';
import brand5 from '../../assets/images/About/brand-5.png';
import excellence from '../../assets/images/About/excellence.png';

const AboutUs = () => {

    var settings = {
        autoplay: true,
        autoplaySpeed: 8000,
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipe: true,
        pauseOnHover: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const brands = [
        {
            link: "/",
            image : brand1,
        },
        {
            link: "/",
            image : brand2,
        },
        {
            link: "/",
            image : brand3,
        },
        {
            link: "/",
            image : brand4,
        },
        {
            link: "/",
            image : brand5,
        },
        {
            link: "/",
            image : brand3,
        },
    ];
    
    return(
        <main className="w-full sm:mt-0">

            {/* Page banner */}
            <PageBanner title={"About Us"} />

            {/* About section */}
            <div className="py-16  px-4 w-full relative z-10">
                <div className="flex sm:w-11/12 m-auto flex-col md:flex-row w-full gap-16 md:gap-6 lg:gap-16 pt-8">
                    <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-5 justify-center">
                        <p className="text-md text-primary-green font-semibold uppercase">~ Organic Cereal Fusion ~</p>
                        <h2 className="text-5xl font-semibold">Organic Whole Grain Breakfast Mixes</h2>
                        <p className="text-md text-black">Organic cereals are an extremely popular breakfast food, very good for health: oat cereal, organic cereal, brown rice cereal, sorghum… It is especially convenient…</p>

                        <Link to="/products" className="inline-block w-max bg-primary-green text-md font-medium text-white px-10 py-2.5 rounded-full shadow-lg capitalize hover:bg-black">See more</Link>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-3/5 flex items-center">
                        <img draggable="false" className="w-full m-auto object-contain object-center" src={aboutImg} alt="About Us" />
                    </div>
                </div>
            </div>

            {/* About section bottom */}
            <div className="py-16  px-4 w-full relative z-10 bg-gray-100">
                <div className="flex sm:w-11/12 m-auto flex-col md:flex-row-reverse w-full gap-16 md:gap-6 lg:gap-16 py-8">
                    <div className="w-full md:w-1/2 flex flex-col gap-5 justify-center">
                        <p className="text-md text-primary-green font-semibold uppercase">~ Pure Organic Pantry ~</p>
                        <h2 className="text-5xl font-semibold">Exploring the World of Organic Foods</h2>
                        <p className="text-md text-black">Organic food is a concept that refers to foods that are raised or grown using the methods and standards of organic agriculture, which do not use: Artificial chemicals pesticides…</p>

                        <Link to="/products" className="inline-block w-max bg-primary-green text-md font-medium text-white px-10 py-2.5 rounded-full shadow-lg capitalize hover:bg-black">See More</Link>
                    </div>

                    <div className="w-full md:w-1/2 flex items-center">
                        <img draggable="false" className="w-full m-auto object-contain object-center" src={aboutImg2} alt="About Us" />
                    </div>
                </div>
            </div>

            {/* Brand section */}
            <div className="py-16 px-4 w-full relative z-10">
                <div className="sm:w-11/12 m-auto w-full pt-8">
                    <Slider {...settings} className="product-slider-home">
                        {brands.map((item, i) => (
                            <div key={i} className="w-full flex items-center justify-center h-full brand-slider-image">
                                <img draggable="false" className="size-40 m-auto object-contain object-center" src={item.image} alt="Brand" />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Excellence section */}
            <div className="py-16  px-4 w-full relative z-10">
                <div className="flex sm:w-11/12 m-auto flex-col w-full gap-16 md:gap-6 lg:gap-16 py-8">
                    <div className="w-full flex flex-col gap-5 items-center justify-center">
                        <p className="text-md text-primary-green font-semibold uppercase">~ Organic Excellence ~</p>
                        <h2 className="text-5xl font-semibold">Healthful Goodness for Life</h2>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row gap-10 mt-10 lg:mt-0">
                        <div className="flex flex-col w-full w-1/3 gap-16 justify-evenly">
                            <div className="flex flex-col gap-3">
                                <h3 className="text-xl font-semibold">Environmental Friendliness</h3>
                                <p className="text-md">Certainly, consumers choose organic food because of safety, avoiding artificial chemicals, and reducing pesticide residue.</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-xl font-semibold">Safe For Health</h3>
                                <p className="text-md">Organic food does not use any growth hormones or antibiotics. Movement and irradiation techniques are prohibited, so they…</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full w-1/3">
                            <img draggable="false" className="w-full m-auto object-contain object-center" src={excellence} alt="Excellence" />
                        </div>
                        <div className="flex flex-col w-full w-1/3 gap-16 justify-evenly">
                            <div className="flex flex-col gap-3">
                                <h3 className="text-xl font-semibold">Higher Nutrition</h3>
                                <p className="text-md">Organic food contains 40% more antioxidants than conventional products, which is effective in reducing the risk of heart disease.</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-xl font-semibold">Freeze Without Losing Much</h3>
                                <p className="text-md">These foods are prepared and frozen without much loss in nutritional density. You can also buy organic frozen vegetable.</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

        </main>
    );
}

export default AboutUs;