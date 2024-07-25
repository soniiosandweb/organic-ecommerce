import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';
import { useSnackbar } from 'notistack';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import TextField from '@mui/material/TextField';
import { Avatar, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const Account = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const { error, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [editProfile, setEditProfile] = useState(true);

    const updateProfileHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("avatar", avatar);

        dispatch(updateProfile(formData));
    }

    const handleUpdateDataChange = (e) => {
        let file = e.target.files[0];

        if(file){

            if (file.size > 1e6) {
                enqueueSnackbar("Please upload a file smaller than 1 MB", { variant: "warning" });
                return;
            }
            
            const reader = new FileReader();
            setAvatar("");
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);  
        }
        
    }


    useEffect(() => {

        if (isAuthenticated === false) {
            navigate("/login")
        }

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setGender(user.gender);
            setAvatarPreview(user.avatar && user.avatar.url);
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            //navigate('/account');
            setEditProfile(false);

            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [isAuthenticated, dispatch, error, user, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="My Profile" />

            {loading ? <Loader /> :
                <>
                    <main className="w-full py-16 px-4">

                        {/* <!-- row --> */}
                        <div className="flex gap-3.5 flex-col lg:flex-row sm:w-11/12 sm:mt-4 m-auto mb-7">

                            <Sidebar activeTab={"profile"} />

                                {/* <!-- details column --> */}
                                <div className="flex-1 overflow-hidden border border-gray-300 shadow bg-white">

                                    <form
                                        onSubmit={updateProfileHandler}
                                        encType="multipart/form-data"
                                        className="w-full"
                                    >
                                        <h2 className="font-medium text-lg px-4 sm:px-8 py-4 border-b">Personal Information <button type="button" className="text-md text-primary-green font-medium ml-8 cursor-pointer" onClick={() => setEditProfile(!editProfile)}>Edit</button></h2>

                                        {/* <!-- edit info container --> */}
                                        <div className="flex flex-col gap-8 m-4 sm:mx-8 sm:my-6">

                                            <div className="flex flex-col w-full lg:w-1/2 items-center">
                                                <TextField
                                                    fullWidth
                                                    label="Full Name"
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    InputProps={{
                                                        readOnly: editProfile,
                                                    }}
                                                    variant={editProfile ? "filled" : "outlined"}
                                                />
                                            </div>
                                            <div className="flex flex-col w-full lg:w-1/2 items-center">
                                                <TextField
                                                    fullWidth
                                                    label="Email"
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    InputProps={{
                                                        readOnly: editProfile,
                                                    }}
                                                    variant={editProfile ? "filled" : "outlined"}
                                                />
                                            </div>
                                            {/* <!-- input container column --> */}

                                            {/* <!-- gender input --> */}
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-1/2">
                                                <h2 className="text-md">Your Gender :</h2>
                                                <div className="flex items-center gap-6" id="radioInput">
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                    >
                                                        <FormControlLabel name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} control={<Radio required />} label="Male" disabled={editProfile} />
                                                        <FormControlLabel name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} control={<Radio required />} label="Female" disabled={editProfile} />
                                                    </RadioGroup>
                                                </div>
                                            </div>
                                            {/* <!-- gender input --> */}

                                            <div className="flex flex-col w-full justify-start sm:flex-row gap-3 items-center">
                                                <Avatar
                                                    alt="Avatar Preview"
                                                    src={avatarPreview}
                                                    sx={{ width: 56, height: 56 }}
                                                />
                                                <label className={`rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-max py-2 px-5 shadow hover:shadow-lg ${editProfile === false && "hover:bg-gray-700"} `}>
                                                    <input
                                                        type="file"
                                                        name="avatar"
                                                        accept="image/*"
                                                        onChange={handleUpdateDataChange}
                                                        className="hidden"
                                                        disabled={editProfile}
                                                    />
                                                    Choose File
                                                </label>
                                            </div>
                                            <button type="submit" className={`block w-full lg:w-max ${editProfile ? "bg-gray-500 cursor-not-allowed" : "bg-primary-green hover:bg-black"} text-md font-medium text-white px-10 py-3 rounded-sm shadow-lg capitalize my-4`} disabled={editProfile}>Update Profile</button>

                                        </div>
                                        {/* <!-- edit info container --> */}
                                    </form>
                                </div>
                                {/* <!-- details column --> */}
                        </div>
                    </main>
                </>
            }
        </>
    );
};

export default Account;
