import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../actions/userAction';

const PrimaryDropDownMenu = ({ setAnchorEl, user }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { wishlistItems } = useSelector((state) => state.wishlist);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        setAnchorEl(null);
    }

    const handleClose = () => {
        setAnchorEl(null);
      };

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
        }
    ]

    return (
        <div className=" w-60 bg-white shadow-2xl rounded flex-col text-sm">

            {user.role === "admin" &&
                <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t" to="/admin/dashboard">
                    <span className="text-primary-green"><DashboardIcon sx={{ fontSize: "18px" }} /></span>
                    Admin Dashboard
                </Link>
            }

            <Link onClick={handleClose} className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t" to="/account">
                <span className="text-primary-green"><AccountCircleIcon sx={{ fontSize: "18px" }} /></span>
                My Profile
            </Link>

            {navs.map((item, i) => {
                const { title, icon, redirect } = item;

                return (
                    <div key={i}>
                        {title === "Wishlist" ? (
                            <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50" to={redirect} key={i}>
                                <span className="text-primary-green">{icon}</span>
                                {title}
                                <span className="ml-auto mr-3 bg-gray-100 p-0.5 px-2 text-gray-600 rounded">
                                    {wishlistItems.length}
                                </span>
                            </Link>
                        ) : (
                            <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50" to={redirect} key={i}>
                                <span className="text-primary-green">{icon}</span>
                                {title}
                            </Link>
                        )}
                    </div>
                )
            })}

            <div className="pl-3 py-3.5 flex gap-3 items-center hover:bg-gray-50 rounded-b cursor-pointer" onClick={handleLogout} >
                <span className="text-primary-green"><PowerSettingsNewIcon sx={{ fontSize: "18px" }} /></span>
                Logout
            </div>

        </div>
    );
};

export default PrimaryDropDownMenu;
