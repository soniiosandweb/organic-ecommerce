import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadPaymentKey, registerUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
        cpassword: "",
    });

    const { name, email, gender, password, cpassword } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }
        if (password !== cpassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }
        if (!avatar) {
            enqueueSnackbar("Select Avatar", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("password", password);
        formData.set("avatar", avatar);

        dispatch(registerUser(formData));
    }

    const handleDataChange = (e) => {
        if (e.target.name === "avatar") {

            let file = e.target.files[0];

            if(file){

                if (file.size > 1e6) {
                    enqueueSnackbar("Please upload a file smaller than 1 MB", { variant: "warning" });
                    return;
                }
                
                const reader = new FileReader();

                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setAvatarPreview(reader.result);
                        setAvatar(reader.result);
                    }
                };

                reader.readAsDataURL(e.target.files[0]);
            }

        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            dispatch(loadPaymentKey())
            navigate('/')
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Register | Fresh Organic Grocery" />

            {loading && <BackdropLoader />}
            <main className="w-full py-16 px-4">

                {/* <!-- row --> */}
                <div className="flex md:w-6/6 lg:w-5/6 xl:w-4/6 sm:mt-4 m-auto mb-7 bg-gray-100 shadow">

                    <FormSidebar
                        title="Looks like you're new here!"
                        tag="Sign up with your mobile number to get started"
                    />

                    {/* <!-- signup column --> */}
                    <div className="flex-1 overflow-hidden">

                        {/* <!-- personal info procedure container --> */}
                        <form
                            onSubmit={handleRegister}
                            encType="multipart/form-data"
                            className="p-5 sm:p-10"
                        >
                            <div className="flex flex-col gap-4 items-start">

                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full justify-between md:flex-col gap-3 items-center">
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
                                </div>
                                {/* <!-- input container column --> */}

                                {/* <!-- gender input --> */}
                                <div className="flex flex-col md:flex-row gap-4 w-full items-start md:items-center">
                                    <h2 className="text-md text-left">Your Gender :</h2>
                                    <div className="flex items-center gap-6" id="radioInput">
                                        <RadioGroup
                                            row
                                            aria-labelledby="radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel name="gender" value="male" onChange={handleDataChange} control={<Radio required />} label="Male" />
                                            <FormControlLabel name="gender" value="female" onChange={handleDataChange} control={<Radio required />} label="Female" />
                                        </RadioGroup>
                                    </div>
                                </div>
                                {/* <!-- gender input --> */}

                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full justify-between md:flex-col gap-3 items-center">
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handleDataChange}
                                        required
                                        className='flex-1'
                                        fullWidth
                                    />
                                    <TextField
                                        id="confirm-password"
                                        label="Confirm Password"
                                        type="password"
                                        name="cpassword"
                                        value={cpassword}
                                        onChange={handleDataChange}
                                        required
                                        className='flex-1'
                                        fullWidth
                                    />
                                </div>
                                {/* <!-- input container column --> */}

                                <div className="flex flex-col w-full justify-start sm:flex-row gap-3 items-center">
                                    <Avatar
                                        alt="Avatar Preview"
                                        src={avatarPreview}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <label className="rounded-sm font-medium bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:bg-gray-700">
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleDataChange}
                                            className="hidden"
                                        />
                                        Choose File
                                    </label>
                                </div>
                                <button type="submit" className="block w-full bg-primary-green text-md font-medium text-white px-10 py-3 rounded-sm shadow-lg capitalize hover:bg-black my-2">Signup</button>
                                <Link to="/login" className="block w-full bg-black text-md font-medium text-white px-10 py-3 rounded-sm shadow-lg capitalize hover:bg-primary-green text-center">Existing User? Log in</Link>
                            </div>

                        </form>
                        {/* <!-- personal info procedure container --> */}

                    </div>
                    {/* <!-- signup column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default Register;
