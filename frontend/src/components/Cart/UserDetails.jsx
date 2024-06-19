import { useNavigate } from "react-router-dom";
import MetaData from "../Layouts/MetaData";
import Stepper from "./Stepper";
import { useDispatch, useSelector } from "react-redux";
import PriceSidebar from "./PriceSidebar";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { clearErrors, loadPaymentKey, registercheckoutUser } from "../../actions/userAction";
import TextField from '@mui/material/TextField'

const UserDetails = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);
    const { isAuthenticated, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;
    const handleRegister = (e) => {

        e.preventDefault();
        if (password.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);

        dispatch(registercheckoutUser(formData));
    }

    const handleDataChange = (e) => {
        
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            dispatch(loadPaymentKey())
            navigate('/shipping')
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);


    return(
        <>
            <MetaData title="Organic: User Details" />

            <main className="w-full py-16 px-4">

                {/* <!-- row --> */}
                <div className="flex flex-col md:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">

                    {/* <!-- cart column --> */}
                    <div className="flex-1">

                        <Stepper activeStep={0}>
                            <div className="w-full bg-white">
                               {isAuthenticated === false ?
                                    <div className="w-full flex flex-col gap-3.5 px-1 sm:px-8 py-8">
                                        <p className="text-md bg-gray-100 rounded-sm border border-gray-300 p-3 flex gap-2"><PersonOutlineOutlinedIcon /> Returning Customer? <a href="/login?redirect=shipping" className="font-semibold">Click Here To Login</a></p>

                                        <p className="text-md font-medium py-2">Create Account</p>

                                        <form onSubmit={handleRegister} className="flex flex-col justify-start gap-5 w-full">

                                            <TextField
                                                fullWidth
                                                id="full-name"
                                                label="Full Name"
                                                name="name"
                                                value={name}
                                                onChange={handleDataChange}
                                                required
                                                className='flex-1'
                                                autoComplete='name'
                                            />

                                            <TextField
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={handleDataChange}
                                                required
                                                className='flex-1'
                                                autoComplete='email'
                                            />

                                            <TextField
                                                id="password"
                                                label="Password"
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={handleDataChange}
                                                required
                                                className='flex-1'
                                                autoComplete='password'
                                            />
                                            
                                            <button type="submit" className="bg-primary-green w-full sm:w-1/3 my-2 py-3.5 text-md font-semibold text-white shadow hover:bg-black rounded-full capitalize outline-none">save and continue</button>

                                        </form>

                                    </div>
                               : null}
                            </div>
                        </Stepper>
                    </div>

                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    )
}

export default UserDetails;