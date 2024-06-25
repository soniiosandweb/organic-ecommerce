import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Layouts/MetaData";
import Sidebar from "../User/Sidebar";
import { useEffect } from "react";
import { getUserReviews } from "../../actions/productAction";
import ReviewItem from "./ReviewItem";
import empty from '../../assets/images/mywishlist-empty.webp';
import { LazyLoadImage } from "react-lazy-load-image-component";

const Rating = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);
    const { userReviews } = useSelector(state => state.userReviews);

    useEffect(() => {
        dispatch(getUserReviews(user._id));
    }, [dispatch, user])

    return (
        <>
            <MetaData title="Reviews & Ratings | Organic" />

            <main className="w-full py-16 px-4">

                <div className="flex gap-3.5 flex-col lg:flex-row sm:w-11/12 sm:mt-4 m-auto mb-7">

                    <Sidebar activeTab={"rating"} />

                    <div className="flex-1 shadow border border-gray-300 bg-white">

                        {/* <!-- ratings container --> */}
                        <div className="flex flex-col">
                            <h2 className="font-medium text-xl px-4 sm:px-8 py-4 border-b">My Reviews & Ratings</h2>

                            {userReviews.length === 0 && (
                                <div className="flex items-center flex-col gap-2 m-6">
                                    <LazyLoadImage 
                                     className="object-contain" src={empty} alt="Empty Wishlist"
                                    />
                                    <span className="text-lg font-medium mt-6">Empty Reviews & Ratings</span>
                                    <p>You have no items in your reviews. Start adding!</p>
                                </div>
                            )}

                            {userReviews.map((item, index) => (
                                <ReviewItem {...item} key={index}/>
                            )
                            ).reverse()}

                        </div>
                        {/* <!-- ratings container --> */}

                    </div>

                </div>
            </main>
        </>
    );

}

export default Rating