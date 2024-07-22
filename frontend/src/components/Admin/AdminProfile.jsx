import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Layouts/MetaData"
import { REMOVE_USER_DETAILS, UPDATE_PASSWORD_RESET, UPDATE_USER_RESET } from "../../constants/userConstants";
import { clearErrors, getUserDetails, loadUser, updatePassword, updateUser } from "../../actions/userAction";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import BackdropLoader from "../Layouts/BackdropLoader";
import Loading from "./Loading";
import { Avatar, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";

const AdminProfile = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const userId = params.id;

    const { user, loading } = useSelector((state) => state.userDetails);

    const { isUpdated, error: updateError, loading: updateLoading } = useSelector((state) => state.profile);
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [role, setRole] = useState("");

    const [editProfile, setEditProfile] = useState(true);
    const [editPassword, setEditPassword] = useState(true);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUpdateDataChange = (e) => {
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

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("role", role);
        formData.set("avatar", avatar);

        dispatch(updateUser(userId, formData));
    }

    const updatePasswordSubmitHandler = (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }
        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("oldPassword", oldPassword);
        formData.set("newPassword", newPassword);
        formData.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(formData));
    }

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setGender(user.gender);
            setAvatarPreview(user.avatar && user.avatar.url);
            setRole(user.role);
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_USER_RESET });
            dispatch(loadUser());
            dispatch({ type: REMOVE_USER_DETAILS });
            dispatch({ type: UPDATE_PASSWORD_RESET });
            navigate("/admin");
        }
    }, [dispatch, userId, user, navigate, isUpdated, updateError, enqueueSnackbar]);

    return (
        <>
            <MetaData title={"Admin: Update Profile | Fresh Organic Grocery"} />

            {updateLoading && <BackdropLoader />}

            {loading ? <Loading /> : (
                <>
                    
                    <form onSubmit={updateUserSubmitHandler} className="flex flex-col bg-white rounded-sm border border-gray-300 shadow gap-5 p-3 lg:p-5" id="userform">
                        
                        <h2 className="font-medium text-lg pb-4 border-b">Personal Information <button type="button" className="text-md text-primary-green font-medium ml-8 cursor-pointer" onClick={() => setEditProfile(!editProfile)}>Edit</button></h2>

                        <div className="flex flex-col gap-3 w-full lg:w-2/3">
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

                        <div className="flex flex-col gap-3 w-full lg:w-2/3">
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
                            
                        {/* <!-- gender input --> */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-2/3">
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

                        <div className="flex flex-col w-full lg:w-2/3 justify-start sm:flex-row gap-3 items-center">
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

                        <div className="flex flex-col gap-2 sm:w-1/3">
                            <input form="userform" type="submit" className={`uppercase p-3 text-white font-medium rounded-sm shadow cursor-pointer ${editProfile ? "bg-gray-500 cursor-not-allowed" : "bg-primary-green hover:bg-black"}`} value="Update" name="updateProduct" disabled={editProfile}/>
                        </div>
                    </form>

                    <form onSubmit={updatePasswordSubmitHandler} className="flex flex-col bg-white rounded-sm border border-gray-300 shadow gap-5 p-3 lg:p-5" id="passwordform">
                        
                        <h2 className="font-medium text-lg pb-4 border-b">Update Password <button type="button" className="text-md text-primary-green font-medium ml-8 cursor-pointer" onClick={() => setEditPassword(!editPassword)}>Edit</button></h2>

                        <div className="flex flex-col gap-3 w-full lg:w-2/3">
                            <TextField
                                fullWidth
                                label="Current Password"
                                type="password"
                                name="oldPassword"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                                InputProps={{
                                    readOnly: editPassword,
                                }}
                                variant={editPassword ? "filled" : "outlined"}
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full lg:w-2/3">
                            <TextField
                                fullWidth
                                label="New Password"
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                InputProps={{
                                    readOnly: editPassword,
                                }}
                                variant={editPassword ? "filled" : "outlined"}
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full lg:w-2/3">
                            <TextField
                                fullWidth
                                label="Confirm New Password"
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                InputProps={{
                                    readOnly: editPassword,
                                }}
                                variant={editPassword ? "filled" : "outlined"}
                            />
                        </div>

                        <div className="flex flex-col gap-2 sm:w-1/3">
                            <input form="passwordform" type="submit" className={`uppercase p-3 text-white font-medium rounded-sm shadow cursor-pointer ${editPassword ? "bg-gray-500 cursor-not-allowed" : "bg-primary-green hover:bg-black"}`} value="Update Password" name="updatePassword" disabled={editPassword}/>
                        </div>
                    </form>

                </>
            )}
        </>
    )
}

export default AdminProfile