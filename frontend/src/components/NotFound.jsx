import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="py-16 sm:w-11/12 m-auto px-4 w-full relative z-10 text-center">
            <h1 className='font-barlow font-300 font-semibold'>404</h1>
            <h2 className='text-3xl md:text-5xl font-semibold font-barlow'>Oops! That page can't be found.</h2>

            <div className='w-40 h-0.5 bg-gray-300 mx-auto my-10'></div>

            <p className='text-md text-gray-400 w-full md:w-1/4 mx-auto'>We're really sorry but we can't seem to find the page you were looking for.</p>
            
            <Link to="/" className="my-10 inline-block bg-primary-green text-md font-medium text-white px-8 py-2.5 rounded-full shadow-lg capitalize hover:bg-black">Back to home</Link>
        </div>
    );
};

export default NotFound;
