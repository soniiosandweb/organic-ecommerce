import { LazyLoadImage } from 'react-lazy-load-image-component';
import banner1 from '../../../assets/images/Categories/banner-1.jpg';
import banner2 from '../../../assets/images/Categories/banner-2.jpg';
import banner3 from '../../../assets/images/Categories/banner-3.jpg';
import { Link } from 'react-router-dom';

const CategoriesBanner = () => {

    const categoriesBanner = [
        {
            title: "Vegetables & Fruits",
            image : banner1,
        },
        {
            title: "The Essence of Organic",
            image : banner2,
        },
        {
            title: "for a Greener Tomorrow",
            image : banner3,
        }
    ];

    return(
        <section className="bg-white w-full overflow-hidden banner-categories-section relative">
            <div className="py-8 lg:py-16 sm:w-11/12 m-auto px-4 w-full flex flex-col md:flex-row gap-8">
                {categoriesBanner.map((el, i) => (
                    <div className='w-full md:w-1/3 flex flex-col gap-2 text-center p-8 md:p-6 lg:p-8 relative overflow-hidden cursor-pointer banner-categories rounded-md' key={i}>
                        <div className='flex flex-col items-start justify-between relative z-10 w-full '>
                            <h3 className='text-xl lg:text-3xl text-start font-semibold capitalize mt-8 mb-8 xl:mb-16 lg:w-3/5'>{el.title}</h3>
                            <Link to="/products" className="inline-block w-max bg-primary-green text-md font-medium text-white px-10 py-2.5 rounded-sm shadow-lg capitalize hover:bg-black">Shop Now</Link>
                        </div>
                        <LazyLoadImage 
                            src={el.image}
                            alt={el.title}
                            className="w-full rounded-md object-cover object-center absolute top-0 left-0 h-full"
                        />
                    </div> 
                    
                ))}
            </div>
           
        </section>
    );
}

export default CategoriesBanner;