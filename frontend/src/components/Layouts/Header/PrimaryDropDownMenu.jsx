import React, { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../actions/userAction';
import { getWIshlistItems } from '../../../actions/wishlistAction';
import { GET_WISHLIST_RESET } from '../../../constants/wishlistConstants';

const PrimaryDropDownMenu = ({ setOpen, user }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { wishlists, loading: wishlistLoading, error: wishlistError } = useSelector((state) => state.wishlists);

    const handleLogout = () => {
        dispatch(logoutUser());
        if(user.role === "admin"){
            navigate("/admin");
        } else {
            navigate("/login");
        }
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(user && user._id && wishlistLoading === undefined){
            dispatch(getWIshlistItems(user._id));
        } 

        if(wishlistError){
            dispatch({ type: GET_WISHLIST_RESET });
        }
     
    }, [dispatch, user, wishlistLoading, wishlistError])

    const navs = [
        {
            title: "Orders",
            icon: <ShoppingBagIcon sx={{ fontSize: "18px" }} />,
            redirect: "/orders",
        },
        {
            title: "Wishlist",
            icon: <FavoriteIcon sx={{ fontSize: "18px" }} />,
            redirect: "/wishlist",
        },
        {
            title: "Reviews & Ratings",
            icon: <StarIcon sx={{ fontSize: "18px" }} />,
            redirect: "/rating",
        },
    ]

    return (
        <div className=" w-60 bg-white shadow-2xl rounded flex-col text-md">

            {/* {user.role === "admin" &&
                <Link onClick={handleClose} className="px-3 py-2.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t" to="/admin/dashboard">
                    <span className="text-primary-green"><DashboardIcon sx={{ fontSize: "18px" }} /></span>
                    Admin Dashboard
                </Link>
            } */}

            <Link onClick={handleClose} className="px-3 py-2.5 border-b flex gap-3 items-center hover:bg-gray-200 rounded-t" to="/account">
                <span className="text-primary-green"><AccountCircleIcon sx={{ fontSize: "18px" }} /></span>
                My Profile
            </Link>

            {navs.map((item, i) => {
                const { title, icon, redirect } = item;

                return (
                    <div key={i}>
                        {title === "Wishlist" ? (
                            <Link onClick={handleClose} className="px-3 py-2.5 border-b flex gap-3 items-center hover:bg-gray-200" to={redirect} key={i}>
                                <span className="text-primary-green">{icon}</span>
                                {title}
                                <span className="ml-auto mr-3 bg-red-600 w-6 h-6 text-white text-center rounded-full">
                                    {wishlists.length}
                                </span>
                            </Link>
                        ) : (
                            <Link onClick={handleClose} className="px-3 py-2.5 border-b flex gap-3 items-center hover:bg-gray-200" to={redirect} key={i}>
                                <span className="text-primary-green">{icon}</span>
                                {title}
                            </Link>
                        )}
                    </div>
                )
            })}

            <div className="px-3 py-2.5 flex gap-3 items-center hover:bg-gray-200 rounded-b cursor-pointer" onClick={handleLogout} >
                <span className="text-primary-green"><PowerSettingsNewIcon sx={{ fontSize: "18px" }} /></span>
                Logout
            </div>

        </div>
    );
};

export default PrimaryDropDownMenu;
