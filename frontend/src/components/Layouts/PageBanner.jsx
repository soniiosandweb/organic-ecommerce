import { LazyLoadImage } from 'react-lazy-load-image-component';
import pageBannerBg from '../../assets/images/ProductSlider/bg-11.webp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const PageBanner = ({title, colored}) => {
    return(
        <section className={`${colored ? "bg-gray-100" : "bg-white"} w-full overflow-hidden page-banner-section relative h-80`}>
            <div className="py-16 sm:w-11/12 m-auto px-4 w-full flex flex-col items-center relative z-10 justify-center h-full">
                <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${colored ? "text-black" : "text-white"} text-center`}>{title}</h1>
                <p className={`flex gap-1 text-medium ${colored ? "text-black" : "text-white"} py-4`}>
                    <a href='/' className='hover:underline'>Home</a>
                    <ChevronRightIcon />
                    {title}
                </p>
            </div>
           
            { colored === false &&
                <LazyLoadImage 
                    className="w-full object-cover object-center absolute top-0 h-full" src={pageBannerBg} alt="banner"
                />
            }
            
        </section>
    )
}

export default PageBanner;