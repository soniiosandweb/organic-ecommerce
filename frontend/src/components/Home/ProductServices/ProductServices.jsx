import serviceBg from '../../../assets/images/ProductSlider/bg-2.webp';
import fruit from '../../../assets/images/ProductSlider/fruit.png';
import shovel from '../../../assets/images/ProductSlider/shovel.png';
import organic from '../../../assets/images/ProductSlider/organic.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductServices = () => {

    const services = [
        {
            title: "Our Products",
            subtitle : "Our Locations, Farmers And Products Are All Carefully And Carefully Selected.",
            image : fruit,
        },
        {
            title: "Our Services",
            subtitle : "We Make High-Quality, Safe Food Accessible To Everyone - Eve",
            image : shovel,
        },
        {
            title: "The Extra Mile",
            subtitle : "We Undertake A Number Of Initiatives Aimed At Meeting And Exceeding",
            image : organic,
        }
    ];


    return (
        <section className="bg-white w-full overflow-hidden relative">
            <div className="py-8 lg:py-16 sm:w-11/12 m-auto px-4 w-full flex flex-col md:flex-row relative z-10 product-services-section">
                {services.map((el, i) => (
                    <div className='w-full md:w-1/3 flex flex-col gap-2 text-center p-5' key={i}>
                        <LazyLoadImage 
                            src={el.image}
                            alt={el.title}
                            className="w-max m-auto object-contain object-center mb-3 cursor-pointer"
                        />
                        <h3 className='text-xl font-medium'>{el.title}</h3>
                        <p className='text-sm w-full lg:w-3/4 m-auto'>{el.subtitle}</p>
                    </div>
                ))}
            </div>
            <LazyLoadImage 
                src={serviceBg}
                alt="banner"
                className="w-full object-cover object-center absolute top-0 h-full"
            />
        </section>
    );
}

export default ProductServices;