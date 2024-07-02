import { useSelector } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import Sidebar from '../User/Sidebar';
import Product from './Product';
import wishlistEmpty from '../../assets/images/mywishlist-empty.webp';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Wishlist = () => {

    const { wishlistItems } = useSelector((state) => state.wishlist);

    return (
        <>
            <MetaData title="Wishlist | Fresh Organic Grocery" />

            <main className="w-full py-16 px-4">

                <div className="flex gap-3.5 flex-col lg:flex-row sm:w-11/12 sm:mt-4 m-auto mb-7">

                    <Sidebar activeTab={"wishlist"} />

                    <div className="flex-1 shadow border border-gray-300 bg-white">
                        {/* <!-- wishlist container --> */}
                        <div className="flex flex-col">
                            <h2 className="font-medium text-xl px-4 sm:px-8 py-4 border-b">My Wishlist ({wishlistItems.length})</h2>

                            {wishlistItems.length === 0 && (
                                <div className="flex items-center flex-col gap-2 m-6">
                                    <LazyLoadImage 
                                        className="object-contain" src={wishlistEmpty} alt="Empty Wishlist" 
                                    />
                                    <span className="text-lg font-medium mt-6">Empty Wishlist</span>
                                    <p>You have no items in your wishlist. Start adding!</p>
                                </div>
                            )}

                            {wishlistItems.map((item, index) => (
                                <Product {...item} key={index}/>
                            )
                            ).reverse()}

                        </div>
                        {/* <!-- wishlist container --> */}

                    </div>

                </div>
            </main>
        </>
    );
};

export default Wishlist;
