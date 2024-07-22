import { useDispatch, useSelector } from 'react-redux';
import FolderIcon from '@mui/icons-material/Folder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../actions/userAction';
import { Avatar } from '@mui/material';

const Sidebar = ({ activeTab }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        navigate("/login");
    }

    return (
        <div className="sm:flex flex-col gap-4 w-full lg:w-1/4">

            {/* <!-- profile card --> */}
            <div className="flex items-center gap-4 p-3 bg-white border border-gray-300 shadow">
                {/* <!-- user icon --> */}
                <div className="w-12 h-12 rounded-full">
                    <Avatar
                        alt="Avatar Preview"
                        src={user.avatar && user.avatar.url}
                        sx={{ width: 48, height: 48 }}
                    />
                </div>
                {/* <!-- user icon --> */}
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Hello,</p>
                    <h2 className="font-medium text-md capitalize">{user.name}</h2>
                </div>
            </div>
            {/* <!-- profile card --> */}

            {/* <!-- nav tiles --> */}
            <div className="flex flex-col bg-white border border-gray-300 shadow">

                {/* <!-- my orders tab --> */}
                <div className="flex items-center gap-5 px-4 py-4 border-b">
                    <span className="text-primary-green"><FolderIcon /></span>
                    <Link className="flex w-full capitalize justify-between font-medium text-black hover:text-primary-green" to="/orders">
                        My orders
                        <span><ChevronRightIcon /></span>
                    </Link>
                </div>
                {/* <!-- my orders tab --> */}

                {/* <!-- account settings tab --> */}
                <div className="flex items-center gap-5 px-4 py-4">
                    <span className="text-primary-green"><PersonIcon /></span>
                    <p className="flex w-full justify-between font-medium text-black capitalize">Account settings</p>
                </div>
                <div className="flex flex-col pb-3 border-b text-md">
                    <Link to="/account" className={`${activeTab === "profile" ? "bg-gray-200 text-primary-green font-medium" : "hover:bg-gray-200 hover:text-primary-green"} p-2 pl-14 text-sm`}>Profile Information</Link>
                    <Link className={`${activeTab === "password" ? "bg-gray-200 text-primary-green font-medium" : "hover:bg-gray-200 hover:text-primary-green"} p-2 pl-14 text-sm`} to="/password/update">Change Password</Link>
                    <Link className={`${activeTab === "address" ? "bg-gray-200 text-primary-green font-medium" : "hover:bg-gray-200 hover:text-primary-green"} p-2 pl-14 text-sm`} to="/address">Manage Addresses</Link>
                </div>
                {/* <!-- account settings tab --> */}

                {/* <!-- my stuff tab --> */}
                <div className="flex items-center gap-5 px-4 py-4">
                    <span className="text-primary-green"><FolderSharedIcon /></span>
                    <p className="flex w-full justify-between font-medium capitalize text-black">My stuff</p>
                </div>
                <div className="flex flex-col pb-3 border-b text-md">
                    <Link className={`${activeTab === "rating" ? "bg-gray-200 text-primary-green font-medium" : "hover:bg-gray-200 hover:text-primary-green"} p-2 pl-14 text-sm`} to="/rating">My Reviews & Ratings</Link>
                    <Link to="/wishlist" className={`${activeTab === "wishlist" ? "bg-gray-200 text-primary-green font-medium" : "hover:bg-gray-200 hover:text-primary-green"} p-2 pl-14 text-sm`}>My Wishlist</Link>
                </div>
                {/* <!-- my stuff tab --> */}

                {/* <!-- logout tab --> */}
                <div className="flex items-center gap-5 px-4 py-4 border-b">
                    <span className="text-primary-green"><PowerSettingsNewIcon /></span>
                    <div className="flex w-full justify-between font-medium text-black hover:text-primary-green cursor-pointer" onClick={handleLogout}>
                        Logout
                        <span><ChevronRightIcon /></span>
                    </div>
                </div>
                {/* <!-- logout tab --> */}

            </div>
            {/* <!-- nav tiles --> */}
        </div>
    );
};

export default Sidebar;
