import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Layouts/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import BackdropLoader from "../Layouts/BackdropLoader";
import { clearErrors, loadPaymentKey, loginAdmin } from "../../actions/userAction";
import logo from '../../assets/images/logo.png';

const AdminLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginAdmin(email, password));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            dispatch(loadPaymentKey())
            navigate("/admin/dashboard")
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin Login | Organic" />

            {loading && <BackdropLoader />}

            <main className="w-full py-16 px-4 h-screen flex items-center bg-gray-100">

                {/* <!-- row --> */}
                <div className="flex w-full md:w-2/3 lg:w-2/4 xl:w-1/3 m-auto bg-white shadow ">

                    {/* <!-- login column --> */}
                    <div className="flex-1 overflow-hidden">

                        {/* <!-- edit info container --> */}
                        <div className="text-center py-10 px-4 sm:px-14">

                            <Link className="h-20 mb-6 mx-auto w-max flex focus-visible:outline-0" to="/">
                                <img draggable="false" className="h-full w-full object-contain" src={logo} alt="Organic Logo" />
                            </Link>

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
