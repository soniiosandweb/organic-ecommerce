import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import Sidebar from './Sidebar';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Password Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            navigate('/account');

            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Password Update | Organic" />

            {loading && <BackdropLoader />}
            <main className="w-full py-16 px-4">

                {/* <!-- row --> */}
                <div className="flex gap-3.5 flex-col lg:flex-row sm:w-11/12 sm:mt-4 m-auto mb-7">

                    <Sidebar activeTab={"password"} />

                    {/* <!-- signup column --> */}
                    <div className="flex-1 overflow-hidden border border-gray-300 shadow bg-white">

                        <h2 className="font-medium text-xl px-4 sm:px-8 py-4 border-b">Update Password</h2>

                        {/* <!-- personal info procedure container --> */}
                        <form
                            onSubmit={updatePasswordSubmitHandler}
                            className="w-full"
                        >
                            <div className="flex flex-col gap-8 m-4 sm:mx-8 sm:my-6">

                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full lg:w-1/2 justify-between gap-8 items-center">

                                    <TextField
                                        fullWidth
                                        label="Current Password"
                                        type="password"
                                        name="oldPassword"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="New Password"
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Confirm New Password"
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />

                                </div>
                                {/* <!-- input container column --> */}
                                <button type="submit" className="block w-full lg:w-max text-md font-medium text-white px-10 py-3 rounded-full shadow-lg capitalize my-4 bg-primary-green hover:bg-black">Update</button>
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

export default UpdatePassword