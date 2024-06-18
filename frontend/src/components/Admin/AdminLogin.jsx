import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Layouts/MetaData";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import BackdropLoader from "../Layouts/BackdropLoader";
import FormSidebar from "../User/FormSidebar";
import { clearErrors, loginAdmin } from "../../actions/userAction";

const AdminLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginAdmin(email, password));
    }

    const redirect = location.search ? location.search.split("=")[1] : "admin/dashboard";

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(`/${redirect}`)
        }
    }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin Login | Organic" />

            {loading && <BackdropLoader />}

            <main className="w-full py-16 px-4">

                {/* <!-- row --> */}
                <div className="flex md:w-6/6 lg:w-5/6 xl:w-4/6 sm:mt-4 m-auto mb-7 bg-gray-100 shadow ">
                    {/* <!-- sidebar column  --> */}
                    <FormSidebar
                        title="Admin Login"
                        tag="Get access to your Orders, Wishlist and Recommendations"
                    />
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- login column --> */}
                    <div className="flex-1 overflow-hidden">

                        {/* <!-- edit info container --> */}
                        <div className="text-center py-10 px-4 sm:px-14">

                            {/* <!-- input container --> */}
                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col w-full gap-4">

                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className='flex-1'
                                        autoComplete="email"
                                    />
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className='flex-1'
                                    />

                                    {/* <!-- button container --> */}
                                    <div className="flex flex-col gap-2.5 my-3">
                                        <button type="submit" className="block w-full bg-primary-green text-md font-medium text-white px-10 py-3 rounded-full shadow-lg capitalize hover:bg-black mt-4">Login</button>
                                    </div>
                                    {/* <!-- button container --> */}

                                </div>
                            </form>

                        </div>

                    </div>
                    {/* <!-- login column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default AdminLogin;
