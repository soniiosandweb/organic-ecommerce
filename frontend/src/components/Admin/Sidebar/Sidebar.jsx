import { Link, useNavigate } from 'react-router-dom';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import CategoryIcon from '@mui/icons-material/Category';
import DiscountIcon from '@mui/icons-material/Discount';
import QueueIcon from '@mui/icons-material/Queue';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../actions/userAction';
import logo from '../../../assets/images/logo-white.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Sidebar = ({ activeTab, setToggleSidebar }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        navigate("/admin");
    }

    const handleClose = () => {
        setToggleSidebar(false)
    }

    const menuClick = () => {
        if (window.innerWidth < 1024 ) {
            setToggleSidebar(false);
        }
    }

    
    const navMenu = [
        {
            icon: <EqualizerIcon />,
            label: "Dashboard",
            ref: "/admin/dashboard",
        },
        {
            icon: <ShoppingBagIcon />,
            label: "Orders",
            ref: "/admin/orders",
        },
        {
            icon: <InventoryIcon />,
            label: "Products",
            ref: "/admin/products",
        },
        {
            icon: <CategoryIcon />,
            label: "Categories",
            ref: "/admin/categories",
        },
        {
            icon: <GroupIcon />,
            label: "Users",
            ref: "/admin/users",
        },
        {
            icon: <ReviewsIcon />,
            label: "Reviews",
            ref: "/admin/reviews",
        },
        {
            icon: <DiscountIcon />,
            label: "Coupons",
            ref: "/admin/coupons",
        },
        {
            icon: <QueueIcon />,
            label: "FAQs",
            ref: "/admin/faqs",
        },
        {
            icon: <ArticleOutlinedIcon />,
            label: "Blogs",
            ref: "/admin/blogs",
        },
        {
            icon: <AccountBoxIcon />,
            label: "Profile",
            ref: "/admin/profile/"+ user._id,
        },
        {
            icon: <LogoutIcon />,
            label: "Logout",
        },
    ];

    return (
        <aside className="sidebar z-10 lg:z-0 block min-h-screen fixed left-0 pb-14 max-h-screen w-full lg:w-1/4 xl:w-1/5 bg-gray-800 text-white overflow-x-hidden border-r">

            <div className="flex items-center p-2 my-4 mx-3.5">
                <Link className="h-20 flex w-max mx-auto" to="/admin">
                    <LazyLoadImage 
                        src={logo}
                        alt="Fresh Organic Grocery"
                        className="h-full w-full object-contain"
                    />
                </Link>
            </div>

            <div className="flex items-center gap-3 bg-gray-700 p-2 rounded-md shadow-lg my-4 mx-3.5">
                <Avatar
                    alt="Avatar"
                    src={user.avatar && user.avatar.url}
                />
                <div className="flex flex-col gap-0">
                    <span className="font-medium text-lg">{user.name}</span>
                    <span className="text-gray-300 text-sm">{user.email}</span>
                </div>
                <button onClick={handleClose} className="lg:hidden bg-gray-800 ml-auto rounded-full w-10 h-10 flex items-center justify-center">
                    <CloseIcon/>
                </button>
            </div>

            <div className="flex flex-col w-full gap-0 my-8">
                {navMenu.map((item, index) => {
                    const { icon, label, ref } = item;
                    return (
                        <div key={index}>
                            {label === "Logout" ? (
                                <button onClick={handleLogout} className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium w-full">
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </button>
                            ) : (
                                <Link to={ref} onClick={menuClick} className={`${activeTab === index ? "bg-gray-700" : "hover:bg-gray-700"} flex gap-3 items-center py-2 px-4 font-medium text-sm`}>
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </Link>
                            )}
                        </div>
                    )
                }
                )}
            </div>

        </aside>
    )
};

export default Sidebar;
